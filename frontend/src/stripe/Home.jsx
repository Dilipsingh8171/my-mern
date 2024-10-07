import react, { useState } from 'react'

const Home = () => {

    const itemName = "FIREIMG";
    let itemPrice = 700;

    const [quantity, setQuantity] = useState(1)
    const [finalamount, setfinalamount] = useState(itemPrice)


    const decrement = () => {
        if (increment <= 1) {
            setQuantity(1)
            setfinalamount(itemPrice)
        } else if (quantity > 1) {
            setQuantity(quantity - 1)
            setfinalamount(finalamount - itemPrice)
        }
    }

    const increment = () => {
        setQuantity(quantity + 1)
        setfinalamount(setfinalamount + itemPrice)
    }



    const checkout = async () => {
        try {
            const res = fetch('http://localhost:8082/checkout', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': 'http://localhost:8082'
                },
                mode: "cors",
                body: JSON.stringify({
                    items: [
                        {
                            id: 1,
                            quantity: quantity,
                            price: itemPrice,
                            name: itemName
                        },
                    ]
                })
            });

            console.log(res.data)
            window.location = res.url
        } catch (error) {

            console.log(error)
        }
    }

    return (
        <div>


            <div className="container mt-5">
                <h2 className="mb-4">Shopping Cart</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{itemName}</td>
                            <td>{itemPrice}</td>
                            <td>{quantity}</td>
                            <td>$10</td>
                            <td>
                                <button className="btn btn-primary btn-sm" onClick={decrement}>-</button>
                                <button className="btn btn-secondary btn-sm mx-2" onClick={increment}>+</button>
                            </td>
                        </tr>

                    </tbody>
                </table>
                <div className="text-end">
                    <h4>Total: $30</h4>
                    <button className="btn btn-success" onClick={checkout}>Checkout</button>
                </div>
            </div>




        </div>
    )
}

export default Home
