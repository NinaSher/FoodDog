//страница заказа
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Api } from '../../Api'
import './cart.css'

import { OrderItem } from '../../components/OrderItem/OrderItem';
import { calcTotalPrice, enumerate } from "../../components/utils"
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleCheckAll } from '../../store/cartSlice/reducer'
import { setCheckboxEl } from '../../store/cartSlice/reducer'

export const PRODUCT__CARD__KEY = ['PRODUCT__CARD__KEY']

const getOrderItemQueryKey = (cartItemsId) => PRODUCT__CARD__KEY.concat(cartItemsId)

export function Cart() {

	const items = useSelector((store) => store.cart.itemsInCart);

	const cart = useSelector((store) => store.cart)
	const { data: products } = useQuery({
		queryKey: getOrderItemQueryKey(items.map((product) => product.id)),
		queryFn: () => Api.getProductsById(items.map((product) => product.id)),
	})
	console.log(products)
	if (items.length < 1) {
		return (
			<>
				<h1>Ваша корзина пуста!</h1>
				<Link to="/catalog">Вернуться в каталог</Link>
			</>)
	}

	const quantity = (id) => {
		const objId = items.find((obj) => obj.id === id)
		if (!objId) {
			return null
		} else {
			return objId.count
		}
	}
	const [checkbox, setCheckbox] = useState(true)
	const [chicket, setChicket] = useState(true)

	const dispatch = useDispatch()
	const allCheckboxes = () => {
		dispatch(toggleCheckAll())
		setChicket((prev) => !prev)
		setCheckbox((prev) => !prev)
		const revue = items.some((el) => el.checkbox === false)
		if (revue === true) {
			setCheckbox(false)
		}
	}

	const checkboxEl = (id) => {
		dispatch(setCheckboxEl(id))
		setChicket((prev) => !prev)
		const revue = items.some((el) => el.checkbox === false)
		if (revue === false) {
			setCheckbox(false)
		}
		if (revue === true) {
			setCheckbox(false)
		}
	}

	return (
		<><div className='cart-button__left'>
			<button className="btn" type="button">Оплатить</button>
		</div>
			<div className='cart-catalog'>
				<Link to="/catalog">Вернуться в каталог</Link>
			</div>
			<div className='cart-catalog'>
				<Link to="/profile">Личный кабинет</Link>
			</div>
			<section className="section-cart">
				<header className='section-cart__header'>
					<h1>Корзина товаров</h1>
				</header>
				<div className='section-cart__body'>
					<div className='container'>
						<section className='cart'>
							<header className='cart-header'>
								<div className='cart-header__title'>наименование</div>
								<div className='cart-header__count'>количество</div>
								<div className='cart-header__cost'>стоимость</div>

							</header>
							<section className='product'>

								{items.map(product => <OrderItem product={product} quantity={quantity} checkboxEl={checkboxEl}
								/>)}
							</section>
							<input type='checkbox' checked={checkbox} onChange={() => allCheckboxes()} /><div className="order-item"></div>
							<footer className='cart-footer'>
								<span>Итого:</span>
								<div className='cart-footer__price'>
									<span>{items.length} {enumerate(items.length, ['товар', 'товара', 'товаров'])} на сумму {calcTotalPrice(items)} руб.</span>
								</div>
							</footer>
						</section>
					</div>
				</div>
			</section>
		</>
	)
};

{/*
					items?.map((el) => (
						<CartItem key={el['_id']}  
						pictures={el.pictures}
						name={el.name}
						quantity={el.quantity}
					/>
				))
				<span>{calcTotalPrice(items)} руб.</span>
					*/}