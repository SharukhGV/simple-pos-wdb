import { useState, useEffect } from 'react'
import './App.css'
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import NewForm from './pages/NewForm';
import NavigationBar from './components/NavigationBar';
import Register from './pages/Register';
import Login from './pages/Login';
import Receipts from "./pages/receipts/Receipts"
import ReceiptDetails from "./pages/receipts/ReceiptDetails";
import EditForm from "./pages/forms/EditForm";
import NewForm from "./pages/forms/NewForm";
import StoreInfo from "./pages/StoreInfo";
import NotFound from './pages/NotFound';
export default function App() {

  const [loginUsername, setLoginUsername] = useState("")
  const [toggleLOGIN, settoggleLOGIN] = useState(false)

  const [accessToken, setAccessToken] = useState('');

  let activityTimer;

  const reloadPage = () => {
    window.location.reload();
  };

  const resetActivityTimer = () => {
    clearTimeout(activityTimer);
    activityTimer = setTimeout(reloadPage, 600000); // 10 minutes
  };

  useEffect(() => {
    resetActivityTimer();

    const activities = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

    activities.forEach(event => {
      window.addEventListener(event, resetActivityTimer);
    });

    return () => {
      clearTimeout(activityTimer);
      activities.forEach(event => {
        window.removeEventListener(event, resetActivityTimer);
      });
    };
  }, []);


  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>

      <Router>
        <NavigationBar toggleTheme={toggleTheme} theme={theme} setTheme={setTheme} set settoggleLOGIN={settoggleLOGIN} toggleLOGIN={toggleLOGIN} accessToken={accessToken} setLoginUsername={setLoginUsername} loginUsername={loginUsername} />
        <Routes>

          {!accessToken ? <Route path="/signup" element={<Register />} /> : null}
          {!accessToken ? <Route path="/login" element={<Login settoggleLOGIN={settoggleLOGIN} toggleLOGIN={toggleLOGIN} accessToken={accessToken} setAccessToken={setAccessToken} loginUsername={loginUsername} setLoginUsername={setLoginUsername} />} /> : null}
          {/* <Route path="/loading" element={<Loading accessToken={accessToken} />} />
          <Route path="/pleaselogin" element={<PleaseLogin accessToken={accessToken} />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/receipts" element={<Receipts />} />
          <Route path="/receipts/:id" element={<ReceiptDetails toggleTheme={toggleTheme} theme={theme} setTheme={setTheme} />} />
          <Route path="/receipts/:id/edit" element={<EditForm />} />
          <Route path="/receipts/new" element={<NewForm />} />
          <Route path="/storeinfo" element={<StoreInfo />} />
          <Route path="/*" element={<NotFound />} />

        </Routes>
      </Router>

    </>
  )
}

