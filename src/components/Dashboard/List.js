import React, { useState, useEffect } from "react";

// import Firebase from "@firebase/app";
import * as firebase from "firebase/app";

import ItemForm from "./ItemForm.js";
// import { TextField } from "@material-ui/core";
// import Button from "@material-ui/core/Button";
// import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import styled from "styled-components";
import TrashIcon from "@material-ui/icons/Delete";
import withStyles from "@material-ui/core/styles/withStyles";

const Background = styled.div`
  background: #209cee;
  padding: 30px;
  height: 100vh;
`;

const ItemStylized = styled.div`
  background: #fff;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  padding: 5px 10px;
  font-size: 12px;
  margin-bottom: 6px;
  border-radius: 3px;
`;
// text-decoration: items.isAcquired ? "line-through" : "" ;   ^ for above figure out how to make it work.

const ItemList = styled.div`
  background: #e8e8e8;
  border-radius: 4px;
  padding: 10px;
  max-width: 400px;
  text-align: center;
  margin: auto;
`;

const GroceryStylized = styled.div`
  background: #f19cea;
  text-align: center;
  margin: auto;
`;

const CartStylized = styled.div`
  background: #eaf19c;
  text-align: center;
  margin: auto;
`;

//fix trashcan icon
// now to add back in acquiring item/transfering to another collection
// refactoring/cleaning up code base

function Item({ item, moveToCart, deleteItem }) {
  return (
    <ItemStylized

    // style={{ textDecoration: item.isAcquired ? "line-through" : "" }}
    >
      {item.value}
      <div id={item.id}>
        <Icon onClick={moveToCart}>
          {item.list === false ? `shopping_cart` : `null`}
        </Icon>
        <Icon onClick={moveToList}>
          {item.list === true ? `undo_alt` : `null`}
        </Icon>
        <TrashIcon onClick={deleteItem} />
      </div>
    </ItemStylized>
  );
}

function GroceryList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    //Creates array of documents within Shopping List DB
    const user = firebase.auth().currentUser.uid;

    const unsubscribe = firebase

      .firestore()
      .collection("shopping-list-db")
      .where("list", "==", false)
      .where("userId", "==", user)
      .orderBy("timestamp")
      .onSnapshot(snapshot => {
        const newItems = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
          // add a time aspect that we can than use for sorting inately by time on order.
          // since on the internal end index is constantly changing in firebase
        }));
        setItems(newItems);
      });
    return () => unsubscribe();
  }, []);
  return items;
}

function CartList() {
  const [cartItems, setCartItems] = useState([]);
  const user = firebase.auth().currentUser.uid;
  useEffect(() => {
    //Creates array of documents within Shopping List DB
    const unsubscribe = firebase
      .firestore()
      .collection("shopping-list-db")
      .where("list", "==", true)
      .where("userId", "==", user)

      .orderBy("timestamp")
      .onSnapshot(snapshot => {
        const newCartItems = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
          // add a time aspect that we can than use for sorting inately by time on order.
          // since on the internal end index is constantly changing in firebase
        }));
        setCartItems(newCartItems);
      });
    return () => unsubscribe();
  }, []);
  return cartItems;
}
//ideally would have only one icon and one function for moving back and forth between cart/list
//Coulndt' figure out solution in the meantime
//Possibly conditional statements within firebase, but atm don't know syntax
const moveToCart = e => {
  e.preventDefault();
  let dbRef = firebase.firestore().collection("shopping-list-db");

  let itemId = e.target.parentElement.getAttribute("id");
  dbRef.doc(itemId).update({
    list: true
  });
};

const moveToList = e => {
  e.preventDefault();
  let dbRef = firebase.firestore().collection("shopping-list-db");

  let itemId = e.target.parentElement.getAttribute("id");
  dbRef.doc(itemId).update({
    list: false
  });
};

const deleteItem = e => {
  e.stopPropagation();
  //for delete it'll be parentElement (x2) due to teh trashcan Icon having an extra svg
  let id = e.target.parentElement.parentElement.getAttribute("id");
  let dbRef = firebase.firestore().collection("shopping-list-db");
  window.confirm("Do you wish to permanetly delete this item?")
    ? dbRef.doc(id).delete()
    : null;

  // const newList = [...items, items.filter(item => item !== index)];
  // setItems(newList);
};

function List() {
  // const shoppingListItems = AddItem();

  //future items lists cart & receipt for displaying

  return (
    <Background>
      <ItemList>
        <ItemForm />
        <GroceryStylized>
          <h3>Grocery List</h3>
          {GroceryList().map(item => (
            <Item
              key={item.id}
              item={item}
              moveToCart={moveToCart}
              deleteItem={deleteItem}
            />
          ))}
        </GroceryStylized>
      </ItemList>

      <ItemList>
        <CartStylized>
          <h3>Cart List</h3>
          {CartList().map(item => (
            <Item
              key={item.id}
              item={item}
              moveToCart={moveToCart}
              deleteItem={deleteItem}
            />
          ))}
        </CartStylized>
      </ItemList>
    </Background>
  );
}

export default List;
