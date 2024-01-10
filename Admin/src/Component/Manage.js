import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, FormGroup, InputGroup, Modal, Row, Stack, Table } from "react-bootstrap";
import '../assets/Css/Style.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Manage(){

    const[Id,setId] = useState();
    const[register, setRegiter] = useState();
    const[name,setName] = useState();
    const[DOB,setDOB] = useState();
    const[email,setEmail] = useState();
    const[phone,setPhone] = useState();
    const[department,setdepartment] = useState();
    const[amount,setAmount] = useState();
    const[paided,setPaided] = useState("");
    const[balanace,setBalance] = useState();
    const[duedate,setDueDate] = useState();
    const navigate = useNavigate();
   
    const[data,setData] = useState([]);

    const validationstart = localStorage.getItem('Pass');
    let validation;

    try {
        if (typeof validationstart === 'string' && validationstart !== 'undefined') {
            validation = JSON.parse(validationstart);

            if (validation == null) {
                // Handle the case when JSON.parse returns null
                console.error('Invalid JSON format in localStorage');
            }
        } else {
            console.error('No valid data found in localStorage');
            navigate('/');
        }
    } catch (error) {
        // Handle the case when JSON.parse throws an error
        console.error('Error parsing JSON from localStorage:', error);
        navigate('/');
    }
    const logout = () => {
        localStorage.clear();
        navigate("/");
    }


    //navigation to component
    const gotoadd = () =>navigate("/add");

    const[showHistory,setShowhistory] = useState(false)
    const[history,setHistory] = useState([]);

    const historyArray = Array.isArray(history) ? history : [];
    const filterhistory = historyArray.filter((item) => item.Register == register);
    const showPyamentHistory = () =>{
        setShowhistory(!showHistory)

    }


    

    // this condition render table and form
    const[showTable,setshowTable] = useState(true)
    const[showedit,setShowEdit] = useState(false)
    const gotomanage = () =>{

        setShowEdit(false)
        setshowTable(true)
    }

    // this condition render view modal
    const[showView,setShowView] = useState(false);
    const oncloseView = () => setShowView(false);
    const showViewModal = (id) =>{
    const filterView = data.find((data)=>data.Id == id)
    setRegiter(filterView?.Register)
    setName(filterView?.Name)
    setDOB(filterView?.DOB)
    setPhone(filterView?.Phone)
    setdepartment(filterView?.Department)
    setAmount(filterView?.Total)
    setPaided(filterView?.Paided)
    setBalance(filterView?.Balance)
    setDueDate(filterView?.Due_date)
    setShowView(true)

    }
    
    
   
    // this condition render logout modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // delete confirmation modal 
    const [deleteConfirm,setDeleteConfirm] = useState(false);
    const showDelete =(id)=>{
        setDeleteConfirm(true)
        setId(id)
    }
    const hidedelete =()=>setDeleteConfirm(false);
    
    // manage user api
    const getdata = () =>{

        axios.get(`http://localhost/backend/manage_user.php`)
        .then((res)=>{
            console.log(res.data)
            setData(res.data)
        })
    }

    const gethistory = () =>{
        axios.get(`http://localhost/Backend/manage_history.php`)
        .then((res)=>{
            console.log(res.data)
            setHistory(res.data)
        })
    }
    //useEffect to render api data  
    useEffect(()=>{
        getdata();
        gethistory();
   

    },[])
    
   

    // Student data delete api
    const deleteStudent = () =>{

        console.log(Id)
        axios.post(`http://localhost/backend/delete_user.php?id=${Id}`)
        .then((res)=>{
            console.log(res.data);
            setDeleteConfirm(false)
            getdata()

        })
    }

    //edit data start 
    const editdata = (id) =>{
        const filterdata = data.find((data)=>data.Id == id)
        setId(filterdata?.Id)
        setName(filterdata?.Name)
        setRegiter(filterdata?.Register)
        setDOB(filterdata?.DOB)
        setEmail(filterdata?.Email)
        setPhone(filterdata?.Phone)
        setdepartment(filterdata?.Department)
        setAmount(filterdata?.Total)
        setPaided(filterdata?.Paided)
        setDueDate(filterdata?.Due_date)
        console.log(DOB)
        setShowEdit(true)
        setshowTable(false)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        const updatedata = new FormData();

        updatedata.append('id',Id)
        updatedata.append('register',register)
        updatedata.append('name',name)
        updatedata.append('dob',DOB)
        updatedata.append('email',email)
        updatedata.append('phone_number',phone)
        updatedata.append('department',department)
        updatedata.append('total',amount)
        updatedata.append('paided',paided)
        updatedata.append('due_date',duedate)

        axios.post(`http://localhost/backend/edit_user.php`,updatedata)
        .then((res)=>{
            console.log(res.data)
            setShowEdit(false)
            setshowTable(true)
            getdata();
            
        })
        
    }
    //edit data end 

    return(
        <div className="manage vh-100">
            <Row className="g-0 ">
                    <Col lg={2} md={2}>
                    </Col>
                    <Col lg={8} md={8} sm={12}>
                    <h1 className="text-center text-dark pt-3">Manage Students</h1>
                    </Col>
                    <Col lg={2} md={2} sm={12} className=" text-end pe-4 pt-3">
                        <img src={require('../assets/images/user_552721.png')} width={'40px'} height={'40px'} onClick={handleShow} style={{cursor:'pointer'}}  alt="user icon" />
                        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal title</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Username: {validation?.admin}</p>
                                <p>Password: <input type="password" defaultValue={validation?.password} style={{border:'none',outline:'none'}}  disabled /></p>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="outline-danger" onClick={logout}>
                                    Logout
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
            <Container fluid> 
                
               {showTable&&
               < >
                <div className="text-end">
                    <Button  variant="outline-info" className="ps-4 pe-4 fs-5 my-3 fw-bold" onClick={gotoadd}>Add Student</Button> 
                </div>
                <div className="table-container overflow-auto " style={{ height: '450px'}}  >
                <Table  bordereless  className="text-center mb-0 "   >
                    <thead className="table-dark position-sticky top-0">
                        <tr className="text-nowrap">
                            <th><i class="fa-solid fa-hashtag text-warning"></i> SI.No</th>
                            <th><i class="fa-regular fa-address-card text-warning"></i> Reg No</th>
                            <th><i class="fa-regular fa-address-card text-warning"></i> Status</th>
                            <th><i class="fa-solid fa-user text-warning"></i> Name</th>
                            <th><i class="fa-solid fa-calendar-days text-warning"></i> DOB</th>
                            <th><i class="fa-solid fa-phone text-warning"></i> Phone No</th>
                            <th><i class="fa-solid fa-user-graduate text-warning"></i> Department</th>
                            <th><i class="fa-solid fa-coins text-warning"></i> Total Amount</th>
                            <th><i class="fa-solid fa-credit-card text-warning"></i> Paid</th>
                            <th><i class="fa-solid fa-scale-balanced text-warning"></i> Balance</th>
                            <th><i class="fa-solid fa-calendar-days text-warning"></i> Due_Date</th>
                            <th>View</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && Array.isArray(data) && data.length > 0 ?
                        data?.map((data,index)=>(
                            <tr className="align-middle text-nowrap" key={index} >
                            <td>{index + 1}</td>
                            <td>{data?.Register}</td>
                            <td>{ data?.Balance == "0" ? <Button variant="success" className="fw-bold">Completed</Button> : <Button variant="danger" className="fw-bold">Pending</Button>}</td>
                            <td>{data?.Name}</td>
                            <td>{data?.DOB}</td>
                            <td>{data?.Phone}</td>
                            <td>{data?.Department}</td>
                            <td>{data?.Total}</td>
                            <td>{data?.Paided}</td>
                            <td>{data?.Balance}</td>
                            <td>{data?.Due_date}</td>
                            <td><i className="fa fa-eye text-info" onClick={()=>showViewModal(data?.Id)}  style={{cursor:'pointer'}}></i></td>
                            <Modal show={showView} onHide={oncloseView} className="modal">
                                <Modal.Header closeButton>
                                <Modal.Title className=" fw-bold fs-5" >
                                <p >Student Details</p>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="overflow-auto">
                                <Stack gap={3} >
                                <FormGroup as={Row}>
                                        <Form.Label column lg={5} md={5} sm={5} className="fs-5 fw-bold"> Register No   <span style={{paddingLeft:'41px'}}>:</span></Form.Label>
                                        <Col lg={7} md={7} sm={7}>
                                            <Form.Control type="text" className="fs-5"  value={register}   plaintext/>
                                        </Col>
                                </FormGroup>
                                <FormGroup as={Row}>
                                        <Form.Label column lg={5} md={5} sm={5} className="fs-5 fw-bold"> Name  <span style={{paddingLeft:'95px'}}>:</span></Form.Label>
                                        <Col lg={7} md={7} sm={7}>
                                            <Form.Control type="text" className="fs-5"  value={name}   plaintext/>
                                        </Col>
                                </FormGroup>
                                <FormGroup as={Row}>
                                        <Form.Label column lg={5} md={5} sm={5} className="fs-5 fw-bold"> DOB    <span style={{paddingLeft:'108px'}}>:</span></Form.Label>
                                        <Col lg={7} md={7} sm={7}>
                                            <Form.Control type="text" className="fs-5"  value={DOB}   plaintext/>
                                        </Col>
                                </FormGroup>
                                <FormGroup as={Row}>
                                        <Form.Label column lg={5} md={5} sm={5} className="fs-5 fw-bold"> Phone No   <span style={{paddingLeft:'58px'}}>:</span></Form.Label>
                                        <Col lg={7} md={7} sm={7}>
                                            <Form.Control type="text" className="fs-5"  value={phone}   plaintext/>
                                        </Col>
                                </FormGroup>
                                <FormGroup as={Row}>
                                        <Form.Label column lg={5} md={5} sm={5} className="fs-5 fw-bold"> Department  <span style={{paddingLeft:'37px'}}>:</span></Form.Label>
                                        <Col lg={7} md={7} sm={7}>
                                            <Form.Control type="text" className="fs-5"  value={department}   plaintext/>
                                        </Col>
                                </FormGroup>
                                <FormGroup as={Row}>
                                        <Form.Label column lg={5} md={5} sm={5} className="fs-5 fw-bold"> Total Amount   <span style={{paddingLeft:'21  px'}}>:</span></Form.Label>
                                        <Col lg={7} md={7} sm={7}>
                                            <Form.Control type="text" className="fs-5"  value={amount}   plaintext/>
                                        </Col>
                                </FormGroup>
                                <FormGroup as={Row}>
                                        <Form.Label column lg={5} md={5} sm={5} className="fs-5 fw-bold"> Paid <span style={{paddingLeft:'109px'}}>:</span></Form.Label>
                                        <Col lg={7} md={7} sm={7}>
                                            <Form.Control type="text" className="fs-5"  value={paided}   plaintext/>
                                        </Col>
                                </FormGroup>
                                <FormGroup as={Row}>
                                        <Form.Label column lg={5} md={5} sm={5} className="fs-5 fw-bold"> Balance <span style={{paddingLeft:'78px'}}>:</span></Form.Label>
                                        <Col lg={7} md={7} sm={7}>
                                            <Form.Control type="text" className="fs-5"  value={balanace}   plaintext/>
                                        </Col>
                                </FormGroup>
                                <FormGroup as={Row}>
                                        <Form.Label column lg={5} md={5} sm={5} className="fs-5 fw-bold"> Due_Date <span style={{paddingLeft:'60px'}}>:</span></Form.Label>
                                        <Col lg={7} md={7} sm={7}>
                                            <Form.Control type="text" className="fs-5"  value={duedate}   plaintext/>
                                        </Col>
                                </FormGroup>
                                <Button variant="outline-primary" onClick={showPyamentHistory}>Payment History</Button>
                                {showHistory && 
                                    <>
                                    {filterhistory?.sort((a, b) => new Date(b?.Paid_date) - new Date(a?.Paid_date))
                                    .map((historyItem, index) => (
                                        <ul key={index} className="list-style">
                                        <li>
                                            <span className="fw-bold">Amount Paid :</span> {historyItem?.Userpaid}, <span className="fw-bold">Method :</span>  {historyItem?.Usermethod}, <span  className="fw-bold">Date :</span> {historyItem?.Paid_date}
                                        </li>
                                        </ul>
                                    ))}
                                    </>
                                    
                                }
                                
                                </Stack>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={oncloseView}>Close</Button>
                            </Modal.Footer>
                            </Modal>
                            <td><i className="fa fa-edit text-primary" onClick={()=>editdata(data?.Id)} style={{cursor:'pointer'}}></i></td>
                            <td><i className="fa fa-trash text-danger" onClick={()=>showDelete(data?.Id)} style={{cursor:'pointer'}}></i></td>
                            <Modal show={deleteConfirm} onHide={hidedelete} centered>
                                
                                    <Container>
                                    <p className="fs-3 text-center pt-4">Are You Sure to Delete ?</p>
                                    
                                    <div className="text-end mb-3 fs-5">
                                    <Button onClick={hidedelete} variant="outline-primary" className="" >Close</Button>
                                    <Button onClick={deleteStudent} variant="outline-danger" className="mx-2">Delete</Button>
                                    </div>
                                    </Container>
                            </Modal>
                            </tr>
                        )) : 
                        <tr>
                            <td colSpan={15}>
                            <span className="text-danger text-center fw-bold ">No data Available</span>
                            </td>
                        </tr>}
                    </tbody>
                </Table>
                </div>
               </>
               }
               {showedit && 
               <>
                <Row className=" d-flex align-items-center vh-100">
                    <Col lg={6} md={7} sm={12}  className="mx-auto">
                        <Card className="transparency shadow-lg p-3  ">
                            <Form className="text-center p-3" onSubmit={handleSubmit}>
                                <h3 className="fw-bold text-start pb-2">Update Data</h3>
                                <Stack gap={3} >
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Text style={{padding:'0px 8px'}}>Register No</InputGroup.Text>
                                        <Form.Control type="text" placeholder="Enter Your Name " value={register} onChange={(e)=>setRegiter(e.target.value)} />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Text style={{padding:'0px 28px'}}>Name</InputGroup.Text>
                                        <Form.Control type="text" placeholder="Enter Your Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Text style={{padding:'0px 33px'}}>DOB</InputGroup.Text>
                                        <Form.Control type="date" placeholder="Enter Your Name" value={DOB} onChange={(e)=>setDOB(e.target.value)}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Text style={{padding:'0px 22px'}}>Email Id</InputGroup.Text>
                                        <Form.Control type="text" placeholder="Enter Your Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Text style={{padding:'0px 14px'}}>Phone No</InputGroup.Text>
                                        <Form.Control type="text" placeholder="Enter Your Number" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Text style={{padding:'0px 7px'}}>Department</InputGroup.Text>
                                        <Form.Control type="text" placeholder="Enter Your Dept" value={department} onChange={(e)=>setdepartment(e.target.value)}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Text style={{padding:'0px 21px'}}>Amount</InputGroup.Text>
                                        <Form.Control type="text" placeholder="Enter Amount"  value={amount}onChange={(e)=>setAmount(e.target.value)}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Text style={{padding:'0px 21px'}}>Paided</InputGroup.Text>
                                        <Form.Control type="text" placeholder="Enter Amount"  value={paided}onChange={(e)=>setPaided(e.target.value)}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Text style={{padding:'0px 17px'}}>Due Date</InputGroup.Text>
                                        <Form.Control type="date" placeholder="Enter Date" value={duedate} onChange={(e)=>setDueDate(e.target.value)}/>
                                    </InputGroup>
                                </FormGroup>
                                <div className="text-end">
                                    <Button variant="outline-danger mx-2"  className="ps-4 pe-4 " onClick={gotomanage} >Close</Button> 
                                    <Button variant="outline-primary"  type="submit" className="ps-4 pe-4 " >Submit</Button> 
                                </div>
                                </Stack>
                            </Form>
                        </Card>
                    </Col>
                </Row>
               </>
               }
            </Container>
        </div>
    )
}