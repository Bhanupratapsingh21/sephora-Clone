import './Product.css'
import { useState, useEffect } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { AiOutlineStar } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import Data from '../../database/db.json'
import { useContext } from "react";
import useLocalStorageArray from '../../Hooks/LocalStorage';
import generateRandomInfo from '../../Hooks/GenrateRendomInfo'
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  AlertDialog,
  Input,
  FormControl,
  FormLabel,
  Text,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  AlertDialogHeader,
  AlertDialogContent,
  Box,
  useDisclosure,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react'

import { AuthContext } from '../../ContextAPI/AuthContextProvider'

function Product() {

  const { id } = useParams()
  console.log(id)

  const arry1 = Data[id.charAt(0)];
  const arrry2 = arry1[id[1]];

  console.log(arry1)
  console.log(arrry2)

  const [input, setinput] = useState({
    Byname: '',
    Addreas: '',
  })

  const [arry2, addToArray2] = useLocalStorageArray('Order')
  const [array1, addToArray1] = useLocalStorageArray('Cart')

  const handleinput = (e) => {
    setinput((pravstate => ({
      ...pravstate,
      [e.target.name]: e.target.value
    })))
  }

  const { isOpen: checkisOpen, onOpen: checkonOpen, onClose: checkonClose } = useDisclosure()

  const { isOpen: BuynowisOpen, onOpen: BuynowonOpen, onClose: BuynowonClose } = useDisclosure()

  const { Auth } = useContext(AuthContext)

  const data = arrry2

  const datedata = generateRandomInfo()

  const [qty, setqty] = useState(1)

  function generateRandomNumber() {
    const randomNum = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    return randomNum
  }
  const [orderno, setorderno] = useState({
    orderno: ""
  })

  const handleOrderSubmit = () => {
    setstep(3)
    let no = generateRandomNumber()
    setorderno({
      orderno: no
    })
    console.log(input)
    let Orderdata = {
      ...data,
      qty: qty,
      orderno: no,
      ...input,
      ...datedata
    };

    addToArray2(Orderdata)
  }
  
  const handleaddtocart = () => {
    let Productsdata = {
      ...data,
      qty: qty,
      addid : id
    }

    addToArray1(Productsdata)
  }

  const handleqty = (e) => {
    console.log(e.target.value)
    setqty(e.target.value)
  }
  const steps = [
    { title: 'First', description: 'Contact Info' },
    { title: 'Second', description: 'Payment Method' },
    { title: 'Third', description: 'Done' },
  ]

  const [step, setstep] = useState(1)

  return (
    <>
      <AlertDialog
        isOpen={checkisOpen}
        onClose={checkonClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Please Login
            </AlertDialogHeader>

            <AlertDialogBody>
              Hey Bro You Are Not Logged-In Please Login
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme='red' onClick={checkonClose} ml={3}>
                Ohk
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Modal isOpen={BuynowisOpen} onClose={BuynowonClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thanku For Choseing US</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{
            (step == 1) && <Box>
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input name="Byname" onChange={handleinput} placeholder='Full Name' />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Full-Addreas</FormLabel>
                <Input name="Addreas" onChange={handleinput} placeholder='Addreas' />
              </FormControl>
              <br />
              <Button onClick={() => setstep(2)} >Submit</Button>
            </Box>
          }
            {
              (step == 2) && <Box>
                <FormControl>
                  <Text fontSize='3xl' >Payment Method</Text>
                  <br />
                  <Text fontSize='2xl' >We Only Have Cash On Delivery</Text>
                </FormControl>
                <br />
                <Button onClick={handleOrderSubmit} >Order</Button>
              </Box>
            }
            {
              (step == 3) && <Box>
                <FormControl>
                  <Text fontSize='3xl' >Your Order Conformed</Text>
                  <br />
                  <Text fontSize='2xl' >Order Id #{orderno.orderno}</Text>
                </FormControl>
                <br />
                <Button onClick={() => { BuynowonClose(), setstep(1) }} >Done</Button>
              </Box>
            }
          </ModalBody>
          <ModalFooter>
            <Stepper colorScheme='red' index={step}>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box flexShrink='0'>
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>
                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="singleProduct">
        <div className="singleImage">
          <img src={data.imageUrl} alt="productImage" />
        </div>
        <div>
          <div className="proNames">
            <h1>{data.brand}</h1>
            <p>{data.name}</p>
          </div>
          <div className="proRatings">
            5/{data.stars}
          </div>
          <span className="proreviews">( {data.numReviews} Costumer reviews )</span>
          <div className="proPrices">
            <p>
              Old Price :{" "}
              <span className="proOld">
                $ {(data.price + data.price / 10)}
              </span>
            </p>
            <p>
              New Price : <span>${data.price} ( 10% off)</span>
            </p>
            <h2>Get-In : {datedata.leftDays}</h2>
          </div>
          <div className="proDetails">
            <h1>About The Product :</h1>
            <ul>
              <li>
                <span className="proTick">
                  <TiTick />
                </span>
                Color : <span>All colors available</span>
              </li>
              <li>
                <span className="proTick">
                  <TiTick />
                </span>
                Available : <span>In Stock</span>
              </li>
              <li>
                <span className="proTick">
                  <TiTick />
                </span>
                Category : <span>{data.category}</span>
              </li>
              <li>
                <span className="proTick">
                  <TiTick />
                </span>
                Shipping Area : <span>All over the world</span>
              </li>
              <li>
                <span className="proTick">
                  <TiTick />
                </span>
                Shipping fee : <span>Free shipping</span>
              </li>
            </ul>
          </div>
          <div className="proQuantity">
            <p>Quantity :</p>
            <div className="selector">
              <Select onChange={handleqty} placeholder="Select Qty" width="xs" zIndex="0">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </Select>
            </div>
          </div>
          <div className="proAdd">
            <button onClick={handleaddtocart}>
              Add to Basket
            </button>
            <button onClick={() => { Auth.isAuth ? BuynowonOpen() : checkonOpen() }} >Buy Now</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Product 