import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext, } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import * as auth from '../utils/auth';
import Login from './Login';
import InfoTooltip from './InfoTooltip';


function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState({
        name: '',
        about: '',
        avatar: '',
    });
    const [loggedIn, setLoggedIn] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
    const [isUserEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    const checkToken = () => {
        const jwt = localStorage.getItem('jwt')
        if (jwt) {
            auth.cookiesCheck(jwt)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true); 
                        setUserEmail(res.email);
                        navigate("/", { replace: true });
                    }
                })
                .catch((err) => {
                    console.log('Неверный токен.', err);
                })
        }
    };

    useEffect(() => {
        checkToken();
    }, []);

    function signOut() {
        localStorage.removeItem('jwt'); 
        setLoggedIn(false); 
        navigate('/sign-in');
      };

    useEffect(() => {
        if (loggedIn) {
        }
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, cards]) => {
                setCurrentUser(userData);
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [loggedIn]);

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setSelectedCard(null);
        setInfoTooltipPopupOpen(false);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id && c));
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleUpdateUser(data) {
        api.changeUserInfo(data)
            .then(res => {
                setCurrentUser(res);
                setEditProfilePopupOpen(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleUpdateAvatar(data) {
        api.changeAvatar(data)
            .then(res => {
                setCurrentUser(res);
                setEditAvatarPopupOpen(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleAddPlaceSubmit(data) {
        api.addMyCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                setAddPlacePopupOpen(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleRegister(email, password) {
        auth.register(email, password)
            .then((res) => {
                if (res) {
                    setSuccess(true);
                    navigate('/sign-in', { replace: true })
                }
            })
            .catch((err) => {
                setSuccess(false);
                setInfoTooltipPopupOpen(true);
                console.log(err);
            })
    }

    function handleLogin(email, password) {
        auth.authorize(email, password)
            .then((data) => {
                localStorage.setItem("jwt", data.token);
                api.setAuthToken(data.token);
                setLoggedIn(true)
                setUserEmail(email);
                navigate('/', { replace: true })
            }).catch((err) => {
                setSuccess(false);
                setInfoTooltipPopupOpen(true);
                console.log(err);
            })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <div className="page">
                    <Header
                        loggedIn={loggedIn}
                        email={isUserEmail}
                        onSignOut={signOut}

                    />
                    <Routes>
                        <Route
                            exact path='/'
                            element={<>
                                <ProtectedRoute
                                    loggedIn={loggedIn}
                                    component={Main}
                                    handleEditProfileClick={handleEditProfileClick}
                                    handleEditAvatarClick={handleEditAvatarClick}
                                    handleAddPlaceClick={handleAddPlaceClick}
                                    handleCardClick={handleCardClick}
                                    handleLikeClick={handleCardLike}
                                    handleDeleteClick={handleCardDelete}
                                    cards={cards}
                                />
                            </>}
                        />
                        <Route path='/sign-up'
                            element={<Register
                                onRegister={handleRegister}
                            />}
                        />
                        <Route path='/sign-in'
                            element={<Login
                                onLogin={handleLogin}
                            />}
                        />
                        <Route path='*'
                            element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}
                        />
                    </Routes>
                    <Footer />
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                    />
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                    />
                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                    />
                    <InfoTooltip
                        isOpen={isInfoTooltipPopupOpen}
                        isSuccess={isSuccess}
                        onClose={closeAllPopups}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
