import React, { useEffect } from "react";
import { useStateValue } from "./stateProvider";

export default function PersistentState({ children }) {
  const [{ arrayLength, basket, user }, dispatch] = useStateValue();
  const setUser = (savedRaw) => {
    if (savedRaw) {
      let saved = JSON.parse(savedRaw);
      if (
        (saved.username !== null || saved.username !== undefined) &&
        (user?.username === undefined || user?.username === null)
      ) {
        dispatch({
          type: "SET_USER",
          user: { username: saved.username, token: saved.token },
        });
      }
    }
  };
  // const setBasket=(savedBasket)=>{
  //   dispatch({type:'SET_BASKET',basket:savedBasket})
  // }
  const unsetUser = (savedRaw) => {
    if (
      (savedRaw === null || savedRaw === undefined) &&
      (user?.username !== null || user?.username !== undefined)
    ) {
      dispatch({ type: "SET_USER", user: null });
    }
  };

  useEffect(() => {
    //setting user when tab loads
    const savedUser = localStorage.getItem("storageUser");
    setUser(savedUser);

    //setting basket when tab loads,
    //on fisrt load of the entire app, storage is empty
    //set it to empty array, but with JSON.stringify for arrays
    const isStoragEmpty = localStorage.getItem("basket");
    // console.log(isStoragEmpty);
    isStoragEmpty == null && localStorage.setItem("basket", JSON.stringify([]));

    //use storage to set basket
    const savedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    // console.log(basket)

    dispatch({ type: "SET_BASKET", basket: savedBasket });
  }, []);
  useEffect(() => {
    window.addEventListener("storage", () => {
      if (user !== JSON.parse(localStorage.getItem("storageUser"))) {
        const savedRaw = localStorage.getItem("storageUser");
        //user empty and storage full, we want to authenticate in the other tabs
        setUser(savedRaw);
        //user full and storage empty, we want to unauthenticate in the other tabs
        unsetUser(savedRaw);
      }

      //on other tabs: check if baskets (state and storage) are the same
      const storageBasket = JSON.parse(localStorage.getItem("basket"));

      if (storageBasket?.length !== basket?.length) {
        //if baskets (state and storage) are the not the same, update state
        const savedBasket = JSON.parse(localStorage.getItem("basket"));
        dispatch({ type: "SET_BASKET", basket: savedBasket });
      }
    });
  }, []);
  useEffect(() => {
    const storageBasket = JSON.parse(localStorage.getItem("basket"));
    // console.log(storageBasket?.length , basket?.length)
    if (storageBasket?.length !== basket?.length && basket.length !== 0) {
      localStorage.setItem("basket", JSON.stringify(basket));
    }
    if (storageBasket?.length > 0 && basket.length === 0) {
      localStorage.setItem("basket", JSON.stringify(basket));
    }
  }, [basket]);
  return <div>{children}</div>;
}
