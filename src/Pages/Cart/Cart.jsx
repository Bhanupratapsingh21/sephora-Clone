import './Cart.css';
import React from 'react';
import Data from '../../database/db.json'
import generateRandomInfo from '../../Hooks/GenrateRendomInfo';
import useLocalStorageArray from '../../Hooks/LocalStorage';
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
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
function Cart() {
    const [array1] = useLocalStorageArray('Cart');
    const [arry, setarry] = useState(array1)
    const navigate = useNavigate()

    const deleteFromLocalStorageArray = (keyToRemove) => {
        const items = JSON.parse(localStorage.getItem('Cart'));
        let key = 'Cart';
        if (items) {
            // Filter out the item with the specified index
            const newArray = items.filter((_, index) => index !== keyToRemove);
            // Update the local storage with the modified array
            localStorage.setItem(key, JSON.stringify(newArray));
            setarry(newArray)
            return newArray;
        } else {
            console.log("Array not found in local storage.");
            return [];
        }
    };

    if (!arry || arry.length === 0) {
        return (

            <div style={{ textAlign: 'center' }}>
                <br />
                <br />
                <Text fontSize='2xl'>Your Cart Is Empty</Text>
                <br />
                <br />
            </div>
        );
    } else {
        return (
            <>
                <div style={{ textAlign: 'center' }}>
                    <Text fontSize='5xl'>Cart</Text>
                </div>

                {arry.map((obj, index) => {
                    console.log(obj)
                    const datedata = generateRandomInfo();
                    return (
                        <>
                            <div key={index} className="singleProduct">
                                <div className="singleImage">
                                    <img src={obj.imageUrl} alt="productImage" />
                                </div>
                                <div>
                                    <div className="proNames">
                                        <h1>{obj.brand}</h1>
                                        <p>{obj.name}</p>
                                    </div>
                                    <div className="proRatings">
                                        5/{obj.stars}
                                    </div>
                                    <span className="proreviews">( {obj.numReviews} Costumer reviews )</span>
                                    <div className="proPrices">
                                        <p>
                                            Old Price :{" "}
                                            <span className="proOld">
                                                $ {(obj.price + obj.price / 10)}
                                            </span>
                                        </p>
                                        <p>
                                            New Price : <span>${obj.price} ( 10% off)</span>
                                        </p>
                                    </div>
                                    <h2>Left Days : {datedata.leftDays}</h2>
                                    <div>
                                        <h3>Qty : {obj.qty}</h3>
                                        <h3 style={{ color: 'green' }}>{obj.discount}</h3>
                                        <h3>Total Price : $<s>{(obj.price + obj.price / 10)}</s></h3>
                                        <h3>Offer : ${obj.price}</h3>
                                    </div>
                                    <br />
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
                                                Category : <span>{obj.category}</span>
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
                                    <div className="proAdd">
                                        <button onClick={() => { navigate(`/Product/${obj.addid}`) }} >Buy Now</button>
                                        <button onClick={() => { deleteFromLocalStorageArray(index) }} >Remove-Cart</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                })
                }

            </>
        )
    }
}

export default Cart
