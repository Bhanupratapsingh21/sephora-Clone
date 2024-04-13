import React, { useContext, useState } from "react";
import './Header.css'
import { Link, useNavigate } from "react-router-dom";
import { BsSearch, BsBag } from "react-icons/bs";
import { IoMdCart } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { IoBagHandle } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { AuthContext } from "../../ContextAPI/AuthContextProvider.jsx";
import {
    Button,
    AlertDialog,
    Tooltip,
    AlertDialogBody,
    AlertDialogFooter,
    Modal,
    Drawer,
    DrawerBody,
    DrawerFooter,
    Select,
    DrawerHeader,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Input,
    Heading,
    Stack,
    StackDivider,
    Box,
    Text,
    DrawerOverlay,
    Divider,
    DrawerContent,
    DrawerCloseButton,
    Alert,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    useToast,
    ModalBody,
    ModalCloseButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    Portal,
} from "@chakra-ui/react";
import getmedician from "../../database/Debunedata.js";
import { useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
function Header() {


    const {Auth , setAuth} = useContext(AuthContext)

    const [debounce, setdebounce] = useState(false)
    const Navigate = useNavigate();
    const toast = useToast();
    useEffect(() => {
        getmedician();
    }, []);

    const { isOpen: LoginisOpen, onOpen: LoginonOpen, onClose: LoginonClose } = useDisclosure()
    const { isOpen: alertisOpen, onOpen: alertonOpen, onClose: alertonClose } = useDisclosure()
    
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [error, seterror] = useState(false)

    const AuthForm = () => {

        const authpromise = new Promise((resolve, reject) => {
            fetch("https://reqres.in/api/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "email": 'eve.holt@reqres.in', "password": 'pistol' })
            })
                .then((res) => {
                    if (!res.ok) {

                        reject('NetWork Response Was Not Ok')
                    }
                    return res.json();
                })
                .then((res) => {
                    if (res.token) {
                        console.log(res)
                        resolve("ohk")
                        setAuth({
                            isAuth: true,
                            token: res.token,
                            Username: email
                        })
                        console.log(Auth)
                        LoginonClose()
                    } else {
                        console.log('here')
                        reject('Unknow Error')
                    }
                })
                .catch((error) => {
                    // iam just makeing that if the all creadetials are wrong it will also login you
                    seterror(true)
                    reject(error)
                });
        })
        toast.promise(authpromise, {
            success: { title: 'Login Successful With Sephora.', description: "We've Successfully logged into your account." },
            error: { title: 'Login Failed-Check-Net.', description: 'Sorry Try again.' },
            loading: { title: 'Logging You Wait', description: 'Please wait' },
        })

    }
    const handleclicklogin = () => {
        Auth.isAuth ? alertonOpen() : LoginonOpen()
    }


    const Logout = () => {
        setAuth({
            isAuth: false,
            token: null,
            Username: null
        })
        toast({
            title: "Logged out successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
        });
        alertonClose()
    }
    const navigate = useNavigate()
    const handlecartclick = ()=>{
        navigate('/Cart')
    }
    const handleorderlogoc = ()=>{
        navigate('/Orders')
    }
    const handlehome = ()=>{
        navigate('/')
    }
    const onclickdouncedata = (e) => {
        const value = e.target.textContent;
        console.log(value);
        window.location.href = `https://www.sephora.com/search?keyword=${value}`
        setvalue('')
    }
    const getFilteredMedician = (input) => {
        return getmedician()
            .filter(medician => medician.toLowerCase().includes(input.toLowerCase()))
            .slice(0, 6);
    };
    const [timeoutid, settimeoutid] = useState(null)
    const [medician, setmedician] = useState([])
    const [value, setvalue] = useState('')

    const handlesearch = () => {
        if (value === '') {
            console.log("empty value")
        } else (
            window.location.href = `https://www.sephora.com/search?keyword=${value}`
        )
    }

    const handlechangeinput = (e) => {
        const value = e.target.value
        if (value == '') {
            setvalue('')
            setdebounce(false)
        } else {
            setvalue(value)

            clearTimeout(timeoutid);

            const newtimeoutid = setTimeout(() => {
                const filterddata = getFilteredMedician(value)
                setmedician(filterddata);
                setdebounce(true)
            }, 1000);

            settimeoutid(newtimeoutid);
        }

    }
    return (
    <>
        <div>
            <nav className="nav1">
                <div className="textnav" >
                    <Link to="/signup">
                        <p className="navDis">
                           <b>Get 30% OFF* All Sephora Collection. </b> Ends 4/15 **Terms Apply <b>Join BEAUTY INSIDER</b>▸
                        </p>
                    </Link>
                </div>
                <div className="backimg">
                </div>
            </nav>
            <nav className="nav2">
                <div>
                    <div className="navLogo">
                        <Link to="/">
                            <img src="https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/company/5842/applications/6523fa5f41f4eb4c10a1d869/application/pictures/free-logo/resize-w:1440/b0ftwtPw4-Sephora-India.webp" alt="" className="navLogo1" />
                            <img src='https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/company/5842/applications/6523fa5f41f4eb4c10a1d869/application/pictures/free-logo/resize-w:1440/b0ftwtPw4-Sephora-India.webp' alt="logo" className="navLogo2" />
                        </Link>
                    </div>
                    <div className="searchbox">
                        <div className="navSearch">
                            <BsSearch onClick={handlesearch} />
                            <input value={value} onChange={handlechangeinput} type="text" placeholder="search" />
                        </div>
                        {debounce ?
                            <div id="debouncingcard">
                                {medician.map((item, index) => (
                                    <li className="bouncecard" onClick={onclickdouncedata} key={index}>{item}</li>
                                ))}
                            </div> : ''}
                    </div>
                    <div className="navIcons">
                        <div>
                            <RiAdminFill
                                fontSize="20px"
                                onClick={handleclicklogin}
                            />
                        </div>
                        |
                        <div>
                            <IoMdCart onClick={ handlecartclick} fontSize="20px" />
                        </div>
                        |
                        <div>
                            <p>
                                <IoBagHandle onClick={handleorderlogoc} fontSize="20px" />
                                {Auth.isAuth ? (
                                    <Button
                                        h="30px"
                                        w="60px"
                                        className="navLogout"
                                        onClick={() => {
                                            alertonOpen()
                                        }}
                                    >
                                        Logout
                                    </Button>
                                ) : (
                                    <span className="navLogin">
                                        <Button onClick={handleclicklogin} >Get Started</Button>    
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="searchbox2">
                        <div className="navSearch2">
                            <BsSearch onClick={handlesearch} />
                            <input value={value} onChange={handlechangeinput} type="text" placeholder="search" />
                        </div>
                        {debounce ?
                            <div id="debouncingcard2">
                                {medician.map((item, index) => (
                                    <li className="bouncecard" onClick={onclickdouncedata} key={index}>{item}</li>
                                ))}
                            </div> : ''}
                    </div>
            <nav className="nav3">
                <div className="navWrapper">
                    <input type="radio" name="slide" id="menuBtn" />
                    <input type="radio" name="slide" id="cancelBtn" />
                    
                    <ul className="navLink">
                        <label htmlFor="cancelBtn" className="btn navCancel">
                            <MdOutlineCancel />
                        </label>
                        <li>
                            <Link to={`/products?category=makeup`} className="desktopItem">
                                New
                            </Link>
                            <div className="megaBox">
                                <div className="contentBox">
                                    <div className="rowBox">
                                        <header className="navHeader">All Makeup</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Face Foundation</Link>
                                            </li>
                                            <li>
                                                <Link to="">BB & CC Creams</Link>
                                            </li>
                                            <li>
                                                <Link to="">Tinted Moisturizer</Link>
                                            </li>
                                            <li>
                                                <Link to="">Concealer</Link>
                                            </li>
                                            <li>
                                                <Link to="">Face Primer</Link>
                                            </li>
                                            <li>
                                                <Link to="">Contour Color</Link>
                                            </li>
                                            <li>
                                                <Link to="">Correct Face Sets</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">Skin & Eye</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Eye Palettes</Link>
                                            </li>
                                            <li>
                                                <Link to="">Mascara</Link>
                                            </li>
                                            <li>
                                                <Link to="">Eyeliner</Link>
                                            </li>
                                            <li>
                                                <Link to="">Eyebrow</Link>
                                            </li>
                                            <li>
                                                <Link to="">Eyelash Serums</Link>
                                            </li>
                                            <li>
                                                <Link to="">Eye Primer</Link>
                                            </li>
                                            <li>
                                                <Link to="">Eye Sets</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">Hair</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Shampoo</Link>
                                            </li>
                                            <li>
                                                <Link to="">Hair Gloss</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Balm & Treatment</Link>
                                            </li>
                                            <li>
                                                <Link to="">Liquid Gel</Link>
                                            </li>
                                            <li>
                                                <Link to="">Hair Color</Link>
                                            </li>
                                            <li>
                                                <Link to="">Hair Wax</Link>
                                            </li>
                                            <li>
                                                <Link to="">Hair Dryer</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">Lip</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Lipstick</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Gloss</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Balm & Treatment</Link>
                                            </li>
                                            <li>
                                                <Link to="">Liquid Lipstick</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Stain</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Liner</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Plumper</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">Cheek</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Blush</Link>
                                            </li>
                                            <li>
                                                <Link to="">Bronzer</Link>
                                            </li>
                                            <li>
                                                <Link to="">Highlighter</Link>
                                            </li>
                                            <li>
                                                <Link to="">Contour</Link>
                                            </li>
                                            <li>
                                                <Link to="">Accessories</Link>
                                            </li>
                                            <li>
                                                <Link to="">Makeup Palettes</Link>
                                            </li>
                                            <li>
                                                <Link to="">Cheek Palettes</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">New</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Bestsellers</Link>
                                            </li>
                                            <li>
                                                <Link to="">Clean Makeup</Link>
                                            </li>
                                            <li>
                                                <Link to="">Vegan Makeup</Link>
                                            </li>
                                            <li>
                                                <Link to="">Mini Size</Link>
                                            </li>
                                            <li>
                                                <Link to="">Value Size</Link>
                                            </li>
                                            <li>
                                                <Link to=""> Sephora Collection</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Link to={`/products?category=makeup`} className="desktopItem">
                                Brands
                            </Link>
                            <div className="megaBox">
                                <div className="contentBox">
                                    <div className="rowBox">
                                        <header className="navHeader">All Makeup</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Face Foundation</Link>
                                            </li>
                                            <li>
                                                <Link to="">BB & CC Creams</Link>
                                            </li>
                                            <li>
                                                <Link to="">Tinted Moisturizer</Link>
                                            </li>
                                            <li>
                                                <Link to="">Concealer</Link>
                                            </li>
                                            <li>
                                                <Link to="">Face Primer</Link>
                                            </li>
                                            <li>
                                                <Link to="">Contour Color</Link>
                                            </li>
                                            <li>
                                                <Link to="">Correct Face Sets</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">Skin & Eye</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Eye Palettes</Link>
                                            </li>
                                            <li>
                                                <Link to="">Mascara</Link>
                                            </li>
                                            <li>
                                                <Link to="">Eyeliner</Link>
                                            </li>
                                            <li>
                                                <Link to="">Eyebrow</Link>
                                            </li>
                                            <li>
                                                <Link to="">Eyelash Serums</Link>
                                            </li>
                                            <li>
                                                <Link to="">Eye Primer</Link>
                                            </li>
                                            <li>
                                                <Link to="">Eye Sets</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">Hair</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Shampoo</Link>
                                            </li>
                                            <li>
                                                <Link to="">Hair Gloss</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Balm & Treatment</Link>
                                            </li>
                                            <li>
                                                <Link to="">Liquid Gel</Link>
                                            </li>
                                            <li>
                                                <Link to="">Hair Color</Link>
                                            </li>
                                            <li>
                                                <Link to="">Hair Wax</Link>
                                            </li>
                                            <li>
                                                <Link to="">Hair Dryer</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">Lip</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Lipstick</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Gloss</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Balm & Treatment</Link>
                                            </li>
                                            <li>
                                                <Link to="">Liquid Lipstick</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Stain</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Liner</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Plumper</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">Cheek</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Blush</Link>
                                            </li>
                                            <li>
                                                <Link to="">Bronzer</Link>
                                            </li>
                                            <li>
                                                <Link to="">Highlighter</Link>
                                            </li>
                                            <li>
                                                <Link to="">Contour</Link>
                                            </li>
                                            <li>
                                                <Link to="">Accessories</Link>
                                            </li>
                                            <li>
                                                <Link to="">Makeup Palettes</Link>
                                            </li>
                                            <li>
                                                <Link to="">Cheek Palettes</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">New</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Bestsellers</Link>
                                            </li>
                                            <li>
                                                <Link to="">Clean Makeup</Link>
                                            </li>
                                            <li>
                                                <Link to="">Vegan Makeup</Link>
                                            </li>
                                            <li>
                                                <Link to="">Mini Size</Link>
                                            </li>
                                            <li>
                                                <Link to="">Value Size</Link>
                                            </li>
                                            <li>
                                                <Link to=""> Sephora Collection</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Link to={`/products?category=makeup`} className="desktopItem">
                                Makeup
                            </Link>
                            <div className="megaBox">
                                <div className="contentBox">
                                    <div className="rowBox">
                                        <header className="navHeader">All Makeup</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Face Foundation</Link>
                                            </li>
                                            <li>
                                                <Link to="">BB & CC Creams</Link>
                                            </li>
                                            <li>
                                                <Link to="">Tinted Moisturizer</Link>
                                            </li>
                                            <li>
                                                <Link to="">Concealer</Link>
                                            </li>
                                            <li>
                                                <Link to="">Face Primer</Link>
                                            </li>
                                            <li>
                                                <Link to="">Contour Color</Link>
                                            </li>
                                            <li>
                                                <Link to="">Correct Face Sets</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">Skin & Eye</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Eye Palettes</Link>
                                            </li>
                                            <li>
                                                <Link to="">Mascara</Link>
                                            </li>
                                            <li>
                                                <Link to="">Eyeliner</Link>
                                            </li>
                                            <li>
                                                <Link to="">Eyebrow</Link>
                                            </li>
                                            <li>
                                                <Link to="">Eyelash Serums</Link>
                                            </li>
                                            <li>
                                                <Link to="">Eye Primer</Link>
                                            </li>
                                            <li>
                                                <Link to="">Eye Sets</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">Hair</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Shampoo</Link>
                                            </li>
                                            <li>
                                                <Link to="">Hair Gloss</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Balm & Treatment</Link>
                                            </li>
                                            <li>
                                                <Link to="">Liquid Gel</Link>
                                            </li>
                                            <li>
                                                <Link to="">Hair Color</Link>
                                            </li>
                                            <li>
                                                <Link to="">Hair Wax</Link>
                                            </li>
                                            <li>
                                                <Link to="">Hair Dryer</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">Lip</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Lipstick</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Gloss</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Balm & Treatment</Link>
                                            </li>
                                            <li>
                                                <Link to="">Liquid Lipstick</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Stain</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Liner</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Plumper</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">Cheek</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Blush</Link>
                                            </li>
                                            <li>
                                                <Link to="">Bronzer</Link>
                                            </li>
                                            <li>
                                                <Link to="">Highlighter</Link>
                                            </li>
                                            <li>
                                                <Link to="">Contour</Link>
                                            </li>
                                            <li>
                                                <Link to="">Accessories</Link>
                                            </li>
                                            <li>
                                                <Link to="">Makeup Palettes</Link>
                                            </li>
                                            <li>
                                                <Link to="">Cheek Palettes</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">New</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Bestsellers</Link>
                                            </li>
                                            <li>
                                                <Link to="">Clean Makeup</Link>
                                            </li>
                                            <li>
                                                <Link to="">Vegan Makeup</Link>
                                            </li>
                                            <li>
                                                <Link to="">Mini Size</Link>
                                            </li>
                                            <li>
                                                <Link to="">Value Size</Link>
                                            </li>
                                            <li>
                                                <Link to=""> Sephora Collection</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Link to={`/products?category=skincare`} className="desktopItem">
                                Skincare
                            </Link>
                            <div className="megaBox">
                                <div className="contentBox">
                                    <div className="rowBox">
                                        <header className="navHeader">All Skincare</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Moisturizers</Link>
                                            </li>
                                            <li>
                                                <Link to="">Night Creams</Link>
                                            </li>
                                            <li>
                                                <Link to="">Face Oils</Link>
                                            </li>
                                            <li>
                                                <Link to="">Mists & Essences</Link>
                                            </li>
                                            <li>
                                                <Link to="">BB & CC</Link>
                                            </li>
                                            <li>
                                                <Link to="">Creams Cleansers</Link>
                                            </li>
                                            <li>
                                                <Link to="">Exfoliators Makeup</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">Treatments</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Face Serums</Link>
                                            </li>
                                            <li>
                                                <Link to="">Blemish & Acne</Link>
                                            </li>
                                            <li>
                                                <Link to="">Facial Peels</Link>
                                            </li>
                                            <li>
                                                <Link to="">Face Masks</Link>
                                            </li>
                                            <li>
                                                <Link to="">Sheet Masks</Link>
                                            </li>
                                            <li>
                                                <Link to="">Masks</Link>
                                            </li>
                                            <li>
                                                <Link to="">Eye Masks</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">Eye Care</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Eye Creams</Link>
                                            </li>
                                            <li>
                                                <Link to="">Eye Masks</Link>
                                            </li>
                                            <li>
                                                <Link to="">Sunscreen</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Balms</Link>
                                            </li>
                                            <li>
                                                <Link to="">Wellness</Link>
                                            </li>
                                            <li>
                                                <Link to="">High Tech Tools</Link>
                                            </li>
                                            <li>
                                                <Link to="">Body Sunscreen</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">Shop by Concern</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Acne & Blemishes</Link>
                                            </li>
                                            <li>
                                                <Link to="">Anti-Aging</Link>
                                            </li>
                                            <li>
                                                <Link to="">Dark Spots</Link>
                                            </li>
                                            <li>
                                                <Link to="">Pores</Link>
                                            </li>
                                            <li>
                                                <Link to="">Dryness</Link>
                                            </li>
                                            <li>
                                                <Link to="">Fine Lines & Wrinkles</Link>
                                            </li>
                                            <li>
                                                <Link to="">Dullness</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <img
                                            src="https://www.sephora.com/contentimages/meganav/large/2020-12-23-site-dt-botnav-seph-coll-US.jpg?imwidth=294"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Link to="/products?category=hair">Hair</Link>
                            <div className="megaBox">
                                <div className="contentBox">
                                    <div className="rowBox">
                                        <header className="navHeader">All Hair</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Shampoo </Link>
                                            </li>
                                            <li>
                                                <Link to="">Conditioner</Link>
                                            </li>
                                            <li>
                                                <Link to="">Scalp Scrub</Link>
                                            </li>
                                            <li>
                                                <Link to="">Hair oil</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">Treatments</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Hair Masks</Link>
                                            </li>
                                            <li>
                                                <Link to="">Leave-in Conditioners</Link>
                                            </li>
                                            <li>
                                                <Link to="">Hair Oil</Link>
                                            </li>
                                            <li>
                                                <Link to="">Hair Serums</Link>
                                            </li>
                                            <li>
                                                <Link to="">Scalp Treatments</Link>
                                            </li>
                                            <li>
                                                <Link to="">Hair Supplements</Link>
                                            </li>
                                            <li>
                                                <Link to="">Thinning & Hair Loss</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">All Hair</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Shampoo </Link>
                                            </li>
                                            <li>
                                                <Link to="">Conditioner</Link>
                                            </li>
                                            <li>
                                                <Link to="">Scalp Scrub</Link>
                                            </li>
                                            <li>
                                                <Link to="">Hair oil</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <img
                                            src="https://www.sephora.com/productimages/sku/s2266765-main-zoom.jpg?pb=2020-03-sephora-clean-2019&imwidth=230"
                                            alt=""
                                        />
                                    </div>
                                    <div className="rowBox">
                                        <img
                                            src="https://www.sephora.com/contentimages/meganav/large/slotting-sale-generic-site-desktop-global-navigation-button_copy-only.jpg?imwidth=294"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Link to="/products?category=fragrance">Fragrance</Link>
                            <div className="megaBox">
                                <div className="contentBox">
                                    <div className="rowBox">
                                        <header className="navHeader">All Fragrances</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Just Dropped</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Makeup</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Skincare</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Haircare</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Fragrance</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Bath & Body New</Link>
                                            </li>
                                            <li>
                                                <Link to="">Tools & Brushes</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">Fragrance</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">The Next Big Thing</Link>
                                            </li>
                                            <li>
                                                <Link to="">Bestsellers</Link>
                                            </li>
                                            <li>
                                                <Link to="">Quizzes & Buying Guides</Link>
                                            </li>
                                            <li>
                                                <Link to="">Clean Beauty Guide</Link>
                                            </li>
                                            <li>
                                                <Link to="">Clean+ Planet</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <img
                                            src="https://www.sephora.com/productimages/sku/s1377159-main-zoom.jpg?imwidth=230"
                                            alt=""
                                        />
                                    </div>
                                    <div className="rowBox">
                                        <img
                                            src="https://www.sephora.com/productimages/sku/s513168-main-zoom.jpg?imwidth=230"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Link to="/products?category=tools">Brush's</Link>
                            <div className="megaBox">
                                <div className="contentBox">
                                    <div className="rowBox">
                                        <header className="navHeader">All New</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Just Dropped</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Makeup</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Skincare</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Haircare</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Fragrance</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Bath & Body New</Link>
                                            </li>
                                            <li>
                                                <Link to="">Tools & Brushes</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">All Products</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">The Next Big Thing</Link>
                                            </li>
                                            <li>
                                                <Link to="">Bestsellers</Link>
                                            </li>
                                            <li>
                                                <Link to="">Quizzes & Buying Guides</Link>
                                            </li>
                                            <li>
                                                <Link to="">Clean Beauty Guide</Link>
                                            </li>
                                            <li>
                                                <Link to="">Clean+ Planet</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <img
                                            src="https://www.sephora.com/contentimages/2022-holiday-launch-general-site-desktop-global-navigation-button-holiday-hub-us-can-release.jpg?imwidth=590"
                                            alt=""
                                        />
                                    </div>
                                    <div className="rowBox">
                                        <img
                                            src="https://www.sephora.com/contentimages/meganav/large/2022-6-9-haus-lady-gaga-bundle-b-site-desktop-global-navigation-button-en-us-can.jpg?imwidth=294"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Link to="/products?category=bath">Bath | Body</Link>
                            <div className="megaBox">
                                <div className="contentBox">
                                    <div className="rowBox">
                                        <header className="navHeader">All New</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Just Dropped</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Makeup</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Skincare</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Haircare</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Fragrance</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Bath & Body New</Link>
                                            </li>
                                            <li>
                                                <Link to="">Tools & Brushes</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">All Products</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">The Next Big Thing</Link>
                                            </li>
                                            <li>
                                                <Link to="">Bestsellers</Link>
                                            </li>
                                            <li>
                                                <Link to="">Quizzes & Buying Guides</Link>
                                            </li>
                                            <li>
                                                <Link to="">Clean Beauty Guide</Link>
                                            </li>
                                            <li>
                                                <Link to="">Clean+ Planet</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <img
                                            src="https://www.sephora.com/contentimages/2022-holiday-launch-general-site-desktop-global-navigation-button-holiday-hub-us-can-release.jpg?imwidth=590"
                                            alt=""
                                        />
                                    </div>
                                    <div className="rowBox">
                                        <img
                                            src="https://www.sephora.com/contentimages/meganav/large/2022-6-9-haus-lady-gaga-bundle-b-site-desktop-global-navigation-button-en-us-can.jpg?imwidth=294"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Link to={`/products?category=makeup`} className="desktopItem">
                                Mini Size
                            </Link>
                            <div className="megaBox">
                                <div className="contentBox">
                                    <div className="rowBox">
                                        <header className="navHeader">All Makeup</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Face Foundation</Link>
                                            </li>
                                            <li>
                                                <Link to="">BB & CC Creams</Link>
                                            </li>
                                            <li>
                                                <Link to="">Tinted Moisturizer</Link>
                                            </li>
                                            <li>
                                                <Link to="">Concealer</Link>
                                            </li>
                                            <li>
                                                <Link to="">Face Primer</Link>
                                            </li>
                                            <li>
                                                <Link to="">Contour Color</Link>
                                            </li>
                                            <li>
                                                <Link to="">Correct Face Sets</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">Skin & Eye</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Eye Palettes</Link>
                                            </li>
                                            <li>
                                                <Link to="">Mascara</Link>
                                            </li>
                                            <li>
                                                <Link to="">Eyeliner</Link>
                                            </li>
                                            <li>
                                                <Link to="">Eyebrow</Link>
                                            </li>
                                            <li>
                                                <Link to="">Eyelash Serums</Link>
                                            </li>
                                            <li>
                                                <Link to="">Eye Primer</Link>
                                            </li>
                                            <li>
                                                <Link to="">Eye Sets</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">Hair</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Shampoo</Link>
                                            </li>
                                            <li>
                                                <Link to="">Hair Gloss</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Balm & Treatment</Link>
                                            </li>
                                            <li>
                                                <Link to="">Liquid Gel</Link>
                                            </li>
                                            <li>
                                                <Link to="">Hair Color</Link>
                                            </li>
                                            <li>
                                                <Link to="">Hair Wax</Link>
                                            </li>
                                            <li>
                                                <Link to="">Hair Dryer</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">Lip</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Lipstick</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Gloss</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Balm & Treatment</Link>
                                            </li>
                                            <li>
                                                <Link to="">Liquid Lipstick</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Stain</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Liner</Link>
                                            </li>
                                            <li>
                                                <Link to="">Lip Plumper</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">Cheek</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Blush</Link>
                                            </li>
                                            <li>
                                                <Link to="">Bronzer</Link>
                                            </li>
                                            <li>
                                                <Link to="">Highlighter</Link>
                                            </li>
                                            <li>
                                                <Link to="">Contour</Link>
                                            </li>
                                            <li>
                                                <Link to="">Accessories</Link>
                                            </li>
                                            <li>
                                                <Link to="">Makeup Palettes</Link>
                                            </li>
                                            <li>
                                                <Link to="">Cheek Palettes</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">New</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Bestsellers</Link>
                                            </li>
                                            <li>
                                                <Link to="">Clean Makeup</Link>
                                            </li>
                                            <li>
                                                <Link to="">Vegan Makeup</Link>
                                            </li>
                                            <li>
                                                <Link to="">Mini Size</Link>
                                            </li>
                                            <li>
                                                <Link to="">Value Size</Link>
                                            </li>
                                            <li>
                                                <Link to=""> Sephora Collection</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Link to="/products?category=skincare">Gift & Gift Cards</Link>
                            <div className="megaBox">
                                <div className="contentBox">
                                    <div className="rowBox">
                                        <header className="navHeader">All New</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Just Dropped</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Makeup</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Skincare</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Haircare</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Fragrance</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Bath & Body New</Link>
                                            </li>
                                            <li>
                                                <Link to="">Tools & Brushes</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">All Products</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">The Next Big Thing</Link>
                                            </li>
                                            <li>
                                                <Link to="">Bestsellers</Link>
                                            </li>
                                            <li>
                                                <Link to="">Quizzes & Buying Guides</Link>
                                            </li>
                                            <li>
                                                <Link to="">Clean Beauty Guide</Link>
                                            </li>
                                            <li>
                                                <Link to="">Clean+ Planet</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <img
                                            src="https://www.sephora.com/contentimages/2022-holiday-launch-general-site-desktop-global-navigation-button-holiday-hub-us-can-release.jpg?imwidth=590"
                                            alt=""
                                        />
                                    </div>
                                    <div className="rowBox">
                                        <img
                                            src="https://www.sephora.com/contentimages/meganav/large/2022-6-9-haus-lady-gaga-bundle-b-site-desktop-global-navigation-button-en-us-can.jpg?imwidth=294"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Link to="/products?category=skincare">Beauty Under $20</Link>
                            <div className="megaBox">
                                <div className="contentBox">
                                    <div className="rowBox">
                                        <header className="navHeader">All New</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Just Dropped</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Makeup</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Skincare</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Haircare</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Fragrance</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Bath & Body New</Link>
                                            </li>
                                            <li>
                                                <Link to="">Tools & Brushes</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">All Products</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">The Next Big Thing</Link>
                                            </li>
                                            <li>
                                                <Link to="">Bestsellers</Link>
                                            </li>
                                            <li>
                                                <Link to="">Quizzes & Buying Guides</Link>
                                            </li>
                                            <li>
                                                <Link to="">Clean Beauty Guide</Link>
                                            </li>
                                            <li>
                                                <Link to="">Clean+ Planet</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <img
                                            src="https://www.sephora.com/contentimages/2022-holiday-launch-general-site-desktop-global-navigation-button-holiday-hub-us-can-release.jpg?imwidth=590"
                                            alt=""
                                        />
                                    </div>
                                    <div className="rowBox">
                                        <img
                                            src="https://www.sephora.com/contentimages/meganav/large/2022-6-9-haus-lady-gaga-bundle-b-site-desktop-global-navigation-button-en-us-can.jpg?imwidth=294"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Link to="/products?category=skincare">Sale & Offers</Link>
                            <div className="megaBox">
                                <div className="contentBox">
                                    <div className="rowBox">
                                        <header className="navHeader">All New</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">Just Dropped</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Makeup</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Skincare</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Haircare</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Fragrance</Link>
                                            </li>
                                            <li>
                                                <Link to="">New Bath & Body New</Link>
                                            </li>
                                            <li>
                                                <Link to="">Tools & Brushes</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <header className="navHeader">All Products</header>
                                        <ul className="linkBox">
                                            <li>
                                                <Link to="">The Next Big Thing</Link>
                                            </li>
                                            <li>
                                                <Link to="">Bestsellers</Link>
                                            </li>
                                            <li>
                                                <Link to="">Quizzes & Buying Guides</Link>
                                            </li>
                                            <li>
                                                <Link to="">Clean Beauty Guide</Link>
                                            </li>
                                            <li>
                                                <Link to="">Clean+ Planet</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rowBox">
                                        <img
                                            src="https://www.sephora.com/contentimages/2022-holiday-launch-general-site-desktop-global-navigation-button-holiday-hub-us-can-release.jpg?imwidth=590"
                                            alt=""
                                        />
                                    </div>
                                    <div className="rowBox">
                                        <img
                                            src="https://www.sephora.com/contentimages/meganav/large/2022-6-9-haus-lady-gaga-bundle-b-site-desktop-global-navigation-button-en-us-can.jpg?imwidth=294"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <label htmlFor="menuBtn" className="btn navMenu">
                        <FaBars />
                    </label>
                </div>
            </nav>
        </div>
        <AlertDialog
                isOpen={alertisOpen}
                onClose={alertonClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Already Logged In
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Want To Log-Out ? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={alertonClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={Logout} ml={3}>
                                Log-Out
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Modal isOpen={LoginisOpen} onClose={LoginonClose}>
                {<ModalOverlay
                    bg='none'
                    backdropFilter='auto'
                    backdropInvert='80%'
                    backdropBlur='2px'
                />}
                <ModalContent>
                    <ModalHeader>Login</ModalHeader>
                    <ModalCloseButton />
                    <form>
                        <ModalBody>
                            <Text>Email address</Text>
                            <Input value={email} onChange={(e) => setemail(e.target.value)} type='email' />
                            <Text>Password</Text>
                            <Input value={password} onChange={(e) => setpassword(e.target.value)} type='password' />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='orange' onClick={AuthForm}>
                                Login
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
    </>
    )
}
export default Header