//карточка товара в корзине
import React from "react";
import { useDispatch } from "react-redux";
import { addItem, minusItem } from "../../store/cartSlice/reducer";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./cartItem.css";


export const CartItem = ({
	name,
	price,
	id,
	pictures }) => {
	const dispatch = useDispatch();

		

	const handleDeleteClick = () => {
		dispatch(minusItem(id));
	};

	return (
		<div className="cart-item">
			<div className="cart-item__image">
				<img src={pictures} style={{ height: "100px" }} />
				<span>{name}</span>
			</div>
			<div className="cart-item__price">
				<span>{price} руб.</span>
				<AiOutlineCloseCircle
					size={15}
					className="cart-item__delete-icon"
					onClick={handleDeleteClick}
				/>
			</div>
		</div>
	);
};

