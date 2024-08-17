import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import moment from "moment";


function EditForm() {
  let { id } = useParams();
  const [products, setProducts] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0)
  const [totalTax, setTotalTax] = useState(0)

  function getObjectSpecific(objects, id) {
    let targetObject = null;

    for (let i = 0; i < objects.length; i++) {
      if (objects[i].id === id) {
        targetObject = objects[i];
        break;
      }
    }

    if (targetObject !== null) {
      return targetObject;
    } else {
      return null;
    }
  }


  let newObj = JSON.parse(window.localStorage.getItem("dataJSON"));
  let receipts = getObjectSpecific(newObj, id);
  const [receipt, setreceipt] = useState({
    id: receipts.id,
    name: receipts.name,
    product_list: [...receipts.product_list],
    total: receipts.total,
    date: receipts.date,
    tax_Amount: receipts.tax_Amount,
    receipt_description: receipts.receipt_description,
    total_tax: receipts.tax_total
  });

  useEffect(() => {
    setProducts([...receipts.product_list])

  }, [])
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
      setreceipt({ ...receipt, 'product_list': [...products] })

    } else if (fieldName === 'productCost') {
      const updatedProducts = [...products];
      updatedProducts[index].cost = Number(value);
      setProducts(updatedProducts);
      setreceipt({ ...receipt, 'product_list': [...products] })

    } else if (fieldName === 'taxable') {
      const updatedProducts = [...products];
      updatedProducts[index].taxable = value;
      setProducts(updatedProducts);
      setreceipt({ ...receipt, 'product_list': [...products] })
      if (updatedProducts[index].taxable === "include") {
  
        let costDeductTaxInclusive = (Number(updatedProducts[index].cost) / ((1 + (Number(receipt.tax_Amount) * .01))));
        updatedProducts[index].cost = costDeductTaxInclusive.toFixed(2)
        setProducts(updatedProducts);
        setreceipt({ ...receipt, product_list: updatedProducts });

      }
    }
  };

  const navigate = useNavigate();


  // const handleTextChange = (event) => {

  //   setreceipt({ ...receipt, [event.target.id]: event.target.value });
  // };

  function editObjectreceipt() {

    const existingArray = JSON.parse(window.localStorage.getItem('dataJSON')) || [];

    const indexToRemove = existingArray.findIndex(obj => obj.id === id);

    if (indexToRemove !== -1) {
      existingArray.splice(indexToRemove, 1);
      existingArray.push(receipt);
      const updatedArray = JSON.stringify(existingArray);
      window.localStorage.setItem("dataJSON", updatedArray);
    }

    const updatedArray = JSON.stringify(existingArray);

    window.localStorage.setItem('dataJSON', updatedArray);

  }

  const addProduct = () => {
    // When the button is clicked, add a new product to the state
    setProducts([...products, { name: '', cost: 0, taxable: true }]);
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


  const handleSubmit = (event) => {
    event.preventDefault();


    editObjectreceipt();


    navigate(`/receipts/${id}`)

  };
  return (
    <div style={{marginLeft:"15px", marginRight:"15px"}} className="cardContact">


      <div className="spacerDIV"><strong>✏️ EDIT Receipt Archive 📝</strong></div>
      <form onSubmit={handleSubmit}>


        <input
          id="name"
          value={receipt.name}
          type="text"
          onChange={(e) => handleTextChange(e, 'name')}
          placeholder="Name of Receipt or Customer..."
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
          value={Number(receipt.tax_Amount)}
          onChange={(e) => handleTextChange(e, 'tax_Amount')}
          required
        />%

        {/* <div style={{ color: "yellow", backgroundColor: "purple",width:"150px",height:"25px" }} onClick={addProduct}>Add Product</div> */}
        <ul>
          {receipt.product_list.map((prod, index) => (
            <li key={index}>
              <input
                type="text"
                placeholder="Product Name"
                value={prod.name}
                onChange={(e) => handleTextChange(e, 'productName', index)}
              />
              <label >
                Product Price
                <input
                  type="number"
                  placeholder="Product Cost"
                  value={prod.cost}
                  onChange={(e) => handleTextChange(e, 'productCost', index)}
                /></label>
              <br></br>
              <label>
                Taxable?:
                <select
                  value={prod.taxable}
                  onChange={(e) => handleTextChange(e, 'taxable', index)}
                >
                  <option value="">select from options</option>
                  <option value="include">Include</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>

                </select>
              </label>
            </li>
          ))}
        </ul>




        <p>GRAND TOTAL: <strong>${grandTotal}</strong></p>



        <input type="submit" />
      </form>
      <Link to={`/receipts/${id}`}>
        <button className="backButton">Nevermind!</button>
      </Link>
    </div>

  );
}

export default EditForm;
