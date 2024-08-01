import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);

    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")

    let foodItem = props.foodItem;

    const handleAddToCart = async () => {
        let food = [];
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;

                break;
            }
        }

        if (food !== []) {
            if (food.size === size) {

                await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty });
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size });
                return
            }
            return

        }
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size });
    };

    let finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <div className="col mb-4">
            <div className="card mt-4 p-2" style={{ width: "18rem", maxHeight: "400px", border: "none" }}>
                <img src={foodItem.img} className="card-img-top" alt={foodItem.name} style={{ height: "120px", objectFit: "cover" }} />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{foodItem.name}</h5>
                    <p className="card-text">{foodItem.description}</p>
                    <div className='container w-100 mt-auto'>
                        <div className="d-flex justify-content-between align-items-center">
                            <select className=' m-2 h-100 bg-success rounded' style={{ width: "60px", color: "white" }} onChange={(e) => setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => (
                                    <option key={i + 1} value={i + 1} >{i + 1}</option>
                                ))}
                            </select>

                            <select className=' m-2 h-100 bg-success rounded' ref={priceRef} style={{ flexGrow: 1, color: "white" }} onChange={(e) => setSize(e.target.value)}>
                                {priceOptions.map((data) => (
                                    <option key={data} value={data}>{data}</option>
                                ))}
                            </select>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                            <div className='fs-5'>Rs{finalPrice}/-</div>
                        </div>
                        <div className='d-flex justify-content-center mt-2'>
                            <button className='btn btn-sm btn-success' onClick={handleAddToCart}>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
