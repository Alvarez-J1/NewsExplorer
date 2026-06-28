import { useCallback, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { register, authorize, authorizeDemo, checkToken } from "../../utils/auth";
import { deleteArticle, getArticles, saveArticle } from "../../utils/api";
import { toCardModel } from "../../utils/adapter";

// Components
import LoginModal from "../LoginModal/LoginModal";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import RegisterModal from "../RegisterModal/RegisterModal";
import SuccessModal from "../SuccessModal/SuccessModal";

// Images
import dogImg from "../../assets/dog.jpg";
import lakeImg from "../../assets/Lake.jpg";
import alkImg from "../../assets/alk.jpg";

export default function App() {
  //state
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [visibleCards, setVisibleCards] = useState(3);
  const [, setSearchKeyword] = useState("");
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState({
    email: "",
    username: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  //helpers for NewsAPI dates
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getDateSevenDaysAgo = () => {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return sevenDaysAgo.toISOString().split("T")[0];
  };

  //NewsAPI search
  const searchNews = async (query) => {
    const apiKey = import.meta.env.VITE_NEWS_API_KEY;
    const newsApiBaseUrl =
      import.meta.env.MODE === "production"
        ? "https://nomoreparties.co/news/v2/everything"
        : "https://newsapi.org/v2/everything";

    const params = new URLSearchParams({
      q: query,
      apiKey: apiKey,
      from: getDateSevenDaysAgo(),
      to: getCurrentDate(),
      pageSize: "100",
    });

    try {
      const response = await fetch(`${newsApiBaseUrl}?${params}`);
      const data = await response.json();

      if (response.ok) {
        return data.articles;
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  //mock results for dev
  const SAMPLE_RESULTS = [
    {
      id: 1,
      title: "Everyone Needs a Special ‘Sit Spot’ in Nature",
      source: "TreeSparks",
      date: "November 4, 2020",
      image: dogImg,
      text: "Ever since I read Richard Louv's influential book, Last Child in the Woods, the idea of having a special sit spot has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...",
    },
    {
      id: 2,
      title: "Nature makes you better",
      source: "National Geographic",
      date: "February 19, 2019",
      image: lakeImg,
      text: "We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.",
    },
    {
      id: 3,
      title: "Grand Teton Renews Historic Crest Trail",
      source: "National Parks Travellers",
      date: "October 21, 2020",
      image: alkImg,
      text: "“The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be...",
    },
  ];

  const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

  //SEARCH
  const handleSearch = async (query) => {
    setSearchKeyword(query);
    setSearchQuery(query);
    setIsloading(true);
    setHasSearched(true);
    setError("");
    setVisibleCards(3);

    try {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 600));
        setResults(SAMPLE_RESULTS);
        return;
      } else {
        const articles = await searchNews(query);

        if (articles.length === 0) {
          setResults([]);
        } else {
          const formatted = articles.map((a, i) => ({
            id: `${a.url}-${i}`,
            title: a.title ?? "Untitled",
            source: a.source?.name ?? "Unknown source",
            date: new Date(a.publishedAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            image: a.urlToImage || "",
            text: a.description || a.content || "",
            url: a.url,
          }));
          setResults(formatted);
        }
      }
      navigate(`/results?q=${encodeURIComponent(query)}`);
    } catch (error) {
      console.error("Search failed: ", error);
      setResults([]);
      setError(
        "Sorry, something went wrong during the request. Please try again later."
      );
    } finally {
      setIsloading(false);
    }
  };

  const handleShowMore = () => {
    setIsLoadingMore(true);

    setVisibleCards((prev) => Math.min(prev + 3, results.length));

    setTimeout(() => {
      setIsLoadingMore(false);
    }, 300); // small delay to show state change
  };

  //SAVE/UNSAVE ARTICLES

  const loadSavedArticles = useCallback(async (jwt) => {
    const articles = await getArticles(jwt);
    const normalizedArticles = Array.isArray(articles)
      ? articles.map(toCardModel)
      : [];
    setSavedArticles(normalizedArticles);
    return normalizedArticles;
  }, []);

  const handleSaveArticle = async (rawArticle) => {
    const normalized = toCardModel(rawArticle);
    if (savedArticles.some((x) => x.url === normalized.url)) return;

    if (!token) {
      setSavedArticles((prev) => [...prev, normalized]);
      return;
    }

    try {
      const savedArticle = await saveArticle(rawArticle, normalized.keyword, token);
      const normalizedSavedArticle = toCardModel(savedArticle);
      setSavedArticles((prev) =>
        prev.some((x) => x.url === normalizedSavedArticle.url)
          ? prev
          : [...prev, normalizedSavedArticle]
      );
    } catch (err) {
      if (err?.message === "Article already saved") return;
      console.error("Save article failed:", err);
      throw err;
    }
  };

  const handleUnsaveArticle = async (rawArticle) => {
    const normalized = toCardModel(rawArticle);
    const savedArticle = savedArticles.find((x) => x.url === normalized.url);

    if (token && savedArticle?.id) {
      try {
        await deleteArticle(savedArticle.id, token);
      } catch (err) {
        console.error("Remove article failed:", err);
        throw err;
      }
    }

    setSavedArticles((prev) =>
      prev.filter((x) => x.url !== normalized.url)
    );
  };

  //Auth
  const handleRegistration = async ({ email, password, username }) => {
    try {
      await register(email, password, username);
      const { token } = await authorize(email, password);

      const { data: user } = await checkToken(token);

      localStorage.setItem("jwt", token);
      setToken(token);
      setCurrentUser(user);
      setIsLoggedIn(true);
      await loadSavedArticles(token);
      closeActiveModal();
      setIsSuccessModalOpen(true);
      navigate("/");
    } catch (err) {
      localStorage.removeItem("jwt");
      setToken("");
      setCurrentUser({ email: "", username: "" });
      setIsLoggedIn(false);
      setSavedArticles([]);
      console.error("Registration error:", err);
      throw err;
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      const { token } = await authorize(email, password);

      const { data: user } = await checkToken(token);

      localStorage.setItem("jwt", token);
      setToken(token);
      setCurrentUser(user);
      setIsLoggedIn(true);
      await loadSavedArticles(token);
      closeActiveModal();
      navigate("/");
    } catch (err) {
      localStorage.removeItem("jwt");
      setToken("");
      setCurrentUser({ email: "", username: "" });
      setIsLoggedIn(false);
      setSavedArticles([]);
      console.error("Token validation failed", err);
      throw err;
    }
  };

  const handleDemoLogin = async () => {
    try {
      const { token } = await authorizeDemo();

      const { data: user } = await checkToken(token);

      localStorage.setItem("jwt", token);
      setToken(token);
      setCurrentUser(user);
      setIsLoggedIn(true);
      await loadSavedArticles(token);
      closeActiveModal();
      navigate("/saved-news");
    } catch (err) {
      localStorage.removeItem("jwt");
      setToken("");
      setCurrentUser({ email: "", username: "" });
      setIsLoggedIn(false);
      setSavedArticles([]);
      console.error("Demo login failed", err);
      throw err;
    }
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;
    (async () => {
      try {
        const { data: user } = await checkToken(jwt);
        setToken(jwt);
        setCurrentUser(user);
        setIsLoggedIn(true);
        await loadSavedArticles(jwt);
      } catch {
        localStorage.removeItem("jwt");
        setToken("");
        setIsLoggedIn(false);
        setCurrentUser({ email: "", username: "" });
        setSavedArticles([]);
      }
    })();
  }, [loadSavedArticles]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setToken("");
    setIsLoggedIn(false);
    setCurrentUser({ email: "", username: "" });
    setSavedArticles([]);
    navigate("/");
  };

  //MODALS
  const handleSuccessToLogin = () => {
    setIsSuccessModalOpen(false);
    setActiveModal("login");
  };

  const openRegisterModal = () => {
    setActiveModal("register");
  };

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setIsSuccessModalOpen(false);
  };

  const isAnyModalOpen = activeModal || isSuccessModalOpen;

  return (
    <div className="page">
      <div className="page__frame">
        <div className="page__content">
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  onLogin={handleLogin}
                  onLoginClick={openLoginModal}
                  onRegisterClick={openRegisterModal}
                  onSearch={handleSearch}
                  results={results}
                  hasSearched={hasSearched}
                  isLoading={isLoading}
                  error={error}
                  visibleCards={visibleCards}
                  onShowMore={handleShowMore}
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                  onLogout={handleLogout}
                  isAnyModalOpen={isAnyModalOpen}
                  searchQuery={searchQuery}
                  onSaveArticle={handleSaveArticle}
                  onUnsaveArticle={handleUnsaveArticle}
                  savedArticles={savedArticles}
                  isLoadingMore={isLoadingMore}
                />
              }
            />
            <Route
              path="/results"
              element={
                <Main
                  onSearch={handleSearch}
                  onLoginClick={openLoginModal}
                  onRegisterClick={openRegisterModal}
                  results={results}
                  hasSearched={hasSearched}
                  isLoading={isLoading}
                  error={error}
                  visibleCards={visibleCards}
                  onShowMore={handleShowMore}
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                  onLogout={handleLogout}
                  onSaveArticle={handleSaveArticle}
                  onUnsaveArticle={handleUnsaveArticle}
                  savedArticles={savedArticles}
                  isLoadingMore={isLoadingMore}
                  searchQuery={searchQuery}
                />
              }
            />

            <Route
              path="/saved-news"
              element={
                <SavedNews
                  currentUser={currentUser}
                  onLogout={handleLogout}
                  savedArticles={savedArticles}
                  onUnsaveArticle={handleUnsaveArticle}
                  isAnyModalOpen={isAnyModalOpen}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
          </Routes>
        </div>
      </div>
      <LoginModal
        isOpen={activeModal === "login"}
        onClose={closeActiveModal}
        onLogin={handleLogin}
        onDemoLogin={handleDemoLogin}
        onOpenRegister={openRegisterModal}
      />
      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={closeActiveModal}
        onLogin={handleLogin}
        onRegister={handleRegistration}
        onOpenLogin={openLoginModal}
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={closeActiveModal}
        onOpenLogin={handleSuccessToLogin}
      />
    </div>
  );
}
