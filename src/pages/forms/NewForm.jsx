import { useNavigate, Link } from "react-router-dom";//
import { useState, useEffect } from "react";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import "./newForm.css"

function NewForm() {
  const date7 = new Date();
  const [products, setProducts] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0)

  const [taxable, settaxable] = useState(0)
  const [totalTax, setTotalTax] = useState(0)

  const [receipt, setreceipt] = useState({
    id: uuidv4(),
    name: "",
    product_list: [products],
    total: grandTotal,
    date: date7,
    tax_Amount: 0,
    receipt_description: "",
    total_tax: totalTax
  });


  const navigate = useNavigate();

  const handleTextChange = (e, fieldName, index) => {
    const value = e.target.value;

    if (fieldName === 'name') {
      setreceipt({ ...receipt, [fieldName]: value });
    } else if (fieldName === 'date') {
      setreceipt({ ...receipt, [fieldName]: new Date(value) });
    } else if (fieldName === 'tax_Amount') {
      setreceipt({ ...receipt, [fieldName]: value });
    } else if (fieldName === 'receipt_description') {
      setreceipt({ ...receipt, [fieldName]: value });
    }
    else if (fieldName === 'productName') {
      const updatedProducts = [...products];
      updatedProducts[index].name = value;
      setProducts(updatedProducts);
      setreceipt({ ...receipt, product_list: updatedProducts });

    } else if (fieldName === 'productCost') {
      const updatedProducts = [...products];
      updatedProducts[index].cost = Number(value);
      setProducts(updatedProducts);
      setreceipt({ ...receipt, product_list: updatedProducts });

    }
    else if (fieldName === 'taxable') {
      const updatedProducts = [...products];
      updatedProducts[index].taxable = value;
      setProducts(updatedProducts);
      setreceipt({ ...receipt, product_list: updatedProducts });
      if (updatedProducts[index].taxable === "include") {
  
        let costDeductTaxInclusive = (Number(updatedProducts[index].cost) / ((1 + (Number(receipt.tax_Amount) * .01))));
        updatedProducts[index].cost = costDeductTaxInclusive.toFixed(2)
        setProducts(updatedProducts);
        setreceipt({ ...receipt, product_list: updatedProducts });

      }}
      else {
        const updatedProducts = [...products];
        updatedProducts[index].taxable = value;
        setProducts(updatedProducts);
        setreceipt({ ...receipt, product_list: updatedProducts });
      }
    }




  const addProduct = () => {
    // When the button is clicked, add a new product to the state
    setProducts([...products, { name: '', cost: 0, taxable: "" }]);
  };

  const removeProduct = () => {
    if (products.length > 1) {
      setProducts(products.filter((_, index) => index !== products.length - 1));
    }
  };



  useEffect(() => {
    function totalCostProducts() {
      let cost = 0
      let totTAX = 0
      setGrandTotal(0)
      let totalArray = products
        .filter((y) => y.taxable === "true")
        .map((x) => {
          cost += (Number(x.cost) + (Number(x.cost) * (Number(receipt.tax_Amount) * .01)))
        });

      let noTaxArray = products
        .filter((y) => y.taxable === "false")
        .map((x) => cost += Number(x.cost));

      let includeTaxArray = products
        .filter((y) => y.taxable === "include")
        .map((x) => cost += (Number(x.cost)*(1+ Number(receipt.tax_Amount)*.01)));


      let includeTaxAmount = products
        .filter((x) => x.taxable === "include")
        .map((z) => totTAX += (((Number(z.cost) * (1 + (Number(receipt.tax_Amount) * .01)))) - Number(z.cost)));

      let trueTaxArray = products
        .filter((x) => x.taxable === "true")
        .map((z) => {
          totTAX += (Number(z.cost) * (Number(receipt.tax_Amount) * .01))
        });

      setGrandTotal((Number(cost)).toFixed(2))
      setTotalTax((Number(totTAX)).toFixed(2))
      setreceipt({ ...receipt, "total": grandTotal, total_tax: totalTax })

    }
    totalCostProducts();
  }, [products, grandTotal, setProducts, totalTax, receipt.tax_Amount]);

  console.log(receipt)

  console.log(products)

  const [change, setChange] = useState(0)
  function handleChangeAmount(event) {
    setChange(event.target.value)

  }
  function changetoGiveBack() {
    let amount = change - grandTotal
    return amount.toFixed(2)
  }
  function handleSubmit(event) {
    event.preventDefault();


    let newObj = JSON.parse(window.localStorage.getItem("dataJSON"));
    newObj.push(receipt);
    const updatedArray = JSON.stringify(newObj);
    window.localStorage.setItem("dataJSON", updatedArray);

    navigate("/receipts")

  }

  return (

    <div className="parent">
      <div className="product">
        <h1 className="spacerDIV"><strong>New Receipt</strong></h1>
        <div className="edit">
          <form onSubmit={handleSubmit}>


            <input
              id="name"
              value={receipt.name}
              type="text"
              onChange={(e) => handleTextChange(e, 'name')}
              placeholder="Name of Receipt, Cashier, or Customer..."
              required
            />

            <input
              id="date"
              type="date"
              value={moment(receipt.date).format("YYYY-MM-DD")}
              onChange={(e) => handleTextChange(e, 'date')}
            />


            <textarea
              id="receipt_description"
              name="receipt_description"
              value={receipt.receipt_description}
              placeholder="Write Any Notes Here to Appear on Receipt..."
              onChange={(e) => handleTextChange(e, 'receipt_description')}
              rows="5"
              cols="50"
              required
            />
            <label>Add Tax Amount as Percent</label>
            <br></br>
            <input style={{ width: "150px", height: "25px", borderRadius: "10px", paddingLeft: "50px" }}
              id="tax_Amount"
              type="number"
              name="tax_Amount"
              value={receipt.tax_Amount}
              onChange={(e) => handleTextChange(e, 'tax_Amount')}
              required
            />%
            <br></br>
            <br></br><div style={{ display: "flex" }}>
              <div className="addProductButton" style={{ color: "white", borderRadius: "10px", paddingTop: "7px", backgroundColor: "purple", width: "150px", height: "35px", border: "solid white", textAlign: "center", margin: "auto" }} onClick={addProduct}>Add Product</div>
              <div className="addProductButton" style={{ color: "white", borderRadius: "10px", paddingTop: "7px", backgroundColor: "purple", width: "150px", height: "35px", border: "solid white", textAlign: "center", margin: "auto" }} onClick={removeProduct}>Remove Product</div>
            </div><ul>
              {products.map((product, index) => (
                <li key={index}>
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={(e) => handleTextChange(e, 'productName', index)}
                  />
                  <label >
                    Product Price
                    <input
                      type="number"
                      placeholder="Product Cost"
                      value={product.cost}
                      onChange={(e) => handleTextChange(e, 'productCost', index)}
                    /></label>
                  <br></br>
                  <label>
                    Taxable?:
                    <select
                      value={product.taxable}
                      onChange={(e) => handleTextChange(e, 'taxable', index)}
                    >

                      <option value="">select from options</option>
                      <option value="include">Include Tax in Price</option>
                      <option value="true">Yes, add Tax on top</option>
                      <option value="false">No, do not Tax</option>

                    </select>
                  </label>
                </li>
              ))}
            </ul>
            <input style={{ width: "250px" }} type="submit" />
          </form>

          <Link to={`/receipts `}>
            <button style={{ width: "250px" }} className="backButton">Go Back to All Receipts!</button>
          </Link>
        </div>
      </div>
      <div className="calculations">
        <h3>GRAND TOTAL</h3>
        <h3><strong>${grandTotal}</strong></h3>
        <div>Tax Collected</div>
        <div>{totalTax}</div>
        <br></br>
        <div style={{ maxWidth: "500px", margin: "auto" }}>
          <br></br>
          <br></br>
          <div>Input How much Change You were Given if Payment is Cash</div>
          <input type="text" onChange={handleChangeAmount} value={change}></input>
          <br></br>
          <h3>Change to Give Back:</h3>
          <h3 style={{ color: "yellowgreen" }}> ${changetoGiveBack()}</h3>
        </div>
      </div>

    </div>
  );
}

export default NewForm;
