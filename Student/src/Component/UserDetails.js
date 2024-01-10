import React, { useEffect, useState } from "react";
import { Accordion, Button, Col, Container, Form, Modal, Row, Stack, Table, Toast, ToastContainer } from "react-bootstrap";
import '../assets/Css/Style.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserDetails(){

    const[pay,setPay]= useState();
    const[method,setMethod] = useState()
    const[error,setError] = useState()
    const[balance, setBalance] = useState({});
    const[errorPay, setErrorPay] = useState(false);
    const[history,setHistory] = useState([]);
    const[data,setData] = useState([]);
    const[disableButton, setDisableButton] = useState(false);
    const navigate = useNavigate();


    const [toastshow, settoastShow] = useState(false);
    const[paymentHistory,setPaymentHistory] = useState(false);

    const studentid = localStorage.getItem('Student');
    let studentId;
    try {
        if (typeof studentid === 'string' && studentid !== 'undefined') {
            studentId = JSON.parse(studentid);
            if (studentId === null) {
            // Handle the case when JSON.parse returns null
            console.error('Invalid JSON format in localStorage');
            }
        } else {
            navigate('/');
        }
        } catch (error) {
        // Handle the case when JSON.parse throws an error
        console.error('Error parsing JSON from localStorage:', error);
        }
      
        const dataArray = Array.isArray(data) ? data : [];
        const filteredData = dataArray.filter((item) => item.Register === studentId);
    
    // Check if history is an array
        const historyArray = Array.isArray(history) ? history : [];
        const filterhistory = historyArray.filter((item) => item.Register === studentId);


    const handlePaymentHistory = () =>{
        setPaymentHistory(!paymentHistory)
    }

    const [show, setShow] = useState(false);
    const [showuser, setshowuser] = useState(false);
    const onshowuser = () => {
        setshowuser(true)
    }

    const handleClose = () => {
        setShow(false);
        
    }
  
    const handlepay = (e) => {
        e.preventDefault();
     
        
        const senddata = new FormData();
        senddata.append('register', studentId);
        senddata.append('pay', pay);
        senddata.append('method', method);
    
        if (!pay && !method) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 1000);
        } else {
            console.log(balance,"HELLO")
            if (pay <= parseInt(balance)) {
                axios.post(`http://localhost/Backend/history.php`,senddata)
                .then((res)=>{
                    console.log(res.data)
                    settoastShow(true)
                    setShow(false)
                    setTimeout(()=>{
                        settoastShow(false)
                    },[3000])
                    getdata();
                    gethistory();
                })
                console.log("confirmation");
            } else {
                setErrorPay(true);
                setTimeout(() => {
                    setErrorPay(false);
                }, 3000);
            }
        }
    };
    
    
    const handleShow = () => setShow(true);



    
    const logout =()=>{
        navigate("/")
        localStorage.removeItem('Student')
    }

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
        const getbalance = filteredData.map((item) => item.Balance);
        setBalance(getbalance[0]);

        if (getbalance[0] === 0) {
            setDisableButton(true);
        }
        
    },[])
    

    return(
        <div className="vh-100" id="students">
            <Row className="g-0 pt-2 pb-5 ">
                    <Col lg={2} md={2}>
                    </Col>
                    <Col lg={8} md={8} sm={12}>
                    <h1 className="text-center text-dark pt-3">Student Details</h1>
                    </Col>
                    <Col lg={2} md={2} sm={12} className=" text-end pe-4 pt-3">
                        <img src={require('../assets/images/user_552721.png')} width={'40px'} height={'40px'} onClick={onshowuser} style={{cursor:'pointer'}}  alt="user icon" />
                        <Modal show={showuser} onHide={()=>setshowuser(false)} backdrop="static" keyboard={false} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal title</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Student Id : {studentId} </p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="outline-danger" onClick={logout}>
                                    Logout
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
            <Container>
                        
                <Table responsive bordered  className="text-center " >
                    <thead className=" table-dark ">
                        <tr className="text-nowrap ">
                            <th><i class="fa-regular fa-address-card text-warning"></i> Reg No</th>
                            <th><i class="fa-solid fa-user text-warning"></i> Name</th>
                            <th><i class="fa-solid fa-user-graduate text-warning"></i> Department</th>
                            <th><i class="fas fa-money-check text-warning"></i> Total Amount</th>
                            <th><i class="fa fa-credit-card text-warning"></i> Paid</th>
                            <th><i class="fa-solid fa-money-bill-wave text-warning"></i> Balance</th>
                            <th><i class="fa-solid fa-calendar-days text-warning"></i>Due Date</th>
                            <th>View History</th>
                            {/* <th><i class="fa-solid fa-circle-info text-warning"></i> Detail</th> */}
                        </tr>
                    </thead>
                    <tbody >
                    {filteredData?.map((data, index) => (
                        <tr key={index}>
                            <td>{data?.Register}</td>

                            <td>{data?.Name}</td>
                            <td>{data?.Department}</td>
                            <td>{data?.Total}</td>
                            <td>{data?.Paided}</td>
                            <td>{data?.Balance}</td>
                            <td>{data?.Due_date}</td>
                            <td><i class="fa fa-eye days text-primary" onClick={()=>handlePaymentHistory(data?.Register)} style={{cursor:'pointer'}}></i></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <div className="text-end">
                    <Button  variant="outline-warning" className="ps-4 pe-4 my-3  fw-bold" onClick={handleShow} disabled={disableButton}>Pay Now</Button> 
                    <ToastContainer position="middle-center">
                    <Toast  show={toastshow} onClose={()=>settoastShow(false)}>
                    <div >
                            <div className="screen ">
                                <svg class="clouds" viewBox="0 0 243 172">
                                    <defs>
                                        <linearGradient id="a" x1="0%" y1="21.631%" y2="78.369%">
                                            <stop offset="0%" stop-color="#FCCF31"/>
                                            <stop offset="100%" stop-color="#F55555"/>
                                        </linearGradient>
                                        <linearGradient id="b" x1="0%" y1="21.875%" y2="78.125%"><stop offset="0%" stop-color="#FCCF31"/>
                                            <stop offset="100%" stop-color="#F55555"/>
                                        </linearGradient>
                                        <linearGradient id="c" x1="0%" y1="22.565%" y2="77.435%">
                                            <stop offset="0%" stop-color="#FCCF31"/>
                                            <stop offset="100%" stop-color="#F55555"/>
                                        </linearGradient>
                                    </defs>
                                    <g fill="none">
                                        <path fill="url(#a)" d="M222.088 121.3384a28.8588 28.8588 0 0 0-4.1438-7.771c-2.3029-3.0704-5.1734-5.622-8.413-7.5423-3.2394-1.9202-6.8508-3.2057-10.642-3.7437-3.65-.5156-7.457-.335-11.2353.6443-3.7782.9794-7.1973 2.674-10.1416 4.9036-3.0566 2.31-5.5968 5.1936-7.5085 8.4476a29.0671 29.0671 0 0 0-3.7237 10.69c-.5132 3.6664-.3335 7.4906.6414 11.2859.882 3.4312 2.3446 6.5692 4.2594 9.3271a28.7704 28.7704 0 0 0 7.2325 7.2265c4.7405 3.2927 10.4592 5.1614 16.4602 5.1936h28.8822c2.6012 0 5.09-.5187 7.3609-1.4659 2.3574-.9795 4.4742-2.4164 6.248-4.198a19.3854 19.3854 0 0 0 4.1791-6.2761c.9398-2.2778 1.4562-4.778 1.4562-7.3908 0-2.6129-.5164-5.113-1.4593-7.394-.975-2.3681-2.4055-4.4945-4.1792-6.2762-1.7737-1.7817-3.8906-3.2153-6.248-4.198-2.2676-.944-4.7565-1.4628-7.3576-1.4628l-1.6678.0002z"/>
                                        <path fill="url(#b)" d="M106.4963 29.0076a43.2273 43.2273 0 0 0-6.2427-11.6565c-3.4693-4.6055-7.7937-8.433-12.674-11.3134A43.5245 43.5245 0 0 0 71.5475.422c-5.4987-.7732-11.234-.5025-16.926.9665-5.6919 1.4691-10.8427 4.0111-15.2783 7.3555-4.6048 3.465-8.4316 7.7903-11.3115 12.6713-2.8798 4.881-4.8076 10.3276-5.6097 16.035-.7732 5.4996-.5025 11.236.9663 16.929 1.3287 5.1467 3.532 9.8538 6.4167 13.9906a43.2499 43.2499 0 0 0 10.8958 10.8397c7.1414 4.939 15.7567 7.742 24.797 7.7904h43.511c3.9186 0 7.668-.778 11.089-2.1988 3.5515-1.4692 6.7405-3.6246 9.4125-6.2971a29.0696 29.0696 0 0 0 6.296-9.4142C137.222 65.6732 138 61.923 138 58.0037s-.7779-7.6695-2.1985-11.091c-1.4689-3.552-3.6239-6.7417-6.296-9.4142a29.0639 29.0639 0 0 0-9.4124-6.297c-3.4161-1.416-7.1657-2.1941-11.0843-2.1941l-2.5125.0002z" transform="matrix(-1 0 0 1 160 0)"/>
                                    <path fill="url(#c)" d="M39.3345 145.3368c-.6995-1.9642-1.6892-3.7617-2.906-5.3593-1.6151-2.1175-3.6282-3.8772-5.9-5.2016a20.4283 20.4283 0 0 0-7.4633-2.5819c-2.5597-.3555-5.2296-.231-7.8793.4444s-5.0475 1.8442-7.1124 3.3818a20.1076 20.1076 0 0 0-5.2656 5.826c-1.3406 2.244-2.238 4.7482-2.6115 7.3723-.3599 2.5286-.2339 5.166.4499 7.7834.6185 2.3664 1.6442 4.5305 2.987 6.4325 1.3879 1.9642 3.1108 3.6462 5.0722 4.9838 3.3245 2.2708 7.335 3.5596 11.5435 3.5818h20.255c1.8243 0 3.5697-.3577 5.1622-1.011a13.5058 13.5058 0 0 0 4.3817-2.8952c1.244-1.2287 2.2448-2.6952 2.9309-4.3283.659-1.5709 1.0212-3.2952 1.0212-5.0971 0-1.802-.3621-3.5262-1.0234-5.0994-.6838-1.633-1.687-3.0996-2.9309-4.3283a13.5419 13.5419 0 0 0-4.3817-2.8952c-1.5902-.651-3.3357-1.0088-5.1599-1.0088l-1.1696.0001z" transform="matrix(-1 0 0 1 54 0)"/>
                                    </g>
                                </svg>
                                    <svg class="plane" viewBox="0 0 139 139">
                                        <path fill="#FFF" stroke="url(#a)" stroke-width="2" d="M171.1455 37.3577l-131.69 71.251a2.7136 2.7136 0 0 0-1.4535 2.5092 2.7138 2.7138 0 0 0 1.6436 2.3892l22.4823 8.4671a5.2937 5.2937 0 0 1 2.9597 2.7138l17.4183 35.9715c.3259 1.5876 3.2583 2.0083 3.299.3935l-2.7152-29.7026c.157-2.2004.997-4.297 2.403-5.9975L153.795 58.471a1.6162 1.6162 0 0 1 1.4798-.4207c.526.1172.9531.4993 1.1277 1.0088a1.5462 1.5462 0 0 1-.2724 1.488l-58.8803 71.9973a13.1443 13.1443 0 0 0-2.308 5.9297l-3.5298 25.659c.2986 2.239 2.05 3.0938 3.462 1.0855l12.6802-14.926c.8703-1.1836 2.525-1.4602 3.7334-.624l32.6917 23.8136a2.635 2.635 0 0 0 2.5231.3387 2.6328 2.6328 0 0 0 1.6313-1.9534l26.8131-131.6197a2.713 2.713 0 0 0-1.004-2.6831 2.7164 2.7164 0 0 0-2.8516-.2886l.0543.0815z" transform="translate(-37 -36)"/>
                                    </svg>
                                <p className="message text-success">Payment Successfully!</p>
                            </div>
                        </div>
                        </Toast>
                    </ToastContainer>
                    <Modal show={show} onHide={handleClose} backdrop={"static"} keyboard={false} centered>
                        <Modal.Header closeButton >
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                               <Stack gap={3}>
                                <Form.Group as={Row}>
                                        <Form.Label column lg={4} sm={4} md={4} className="fw-bold">Amount to pay</Form.Label>
                                        <Col>
                                            <Form.Control required type="text" placeholder="enter amount" onChange={(e)=>setPay(e.target.value)}  />
                                            {errorPay && <p  className="text-danger fw-bold text-center">You Pay More than Your fee</p>}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column lg={4} sm={4} md={4} className="fw-bold">Payment Mode</Form.Label>
                                        <Col>
                                            <Form.Select onChange={(e)=>setMethod(e.target.value)}>
                                                <option>Select Payment Mode</option>
                                                <option value="Gpay">Gpay</option>
                                                <option value="UPI">UPI</option>
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                               </Stack>
                               {error && <p className="text-danger fw-bold text-center py-3">Input Fields empty!</p>}
                               <div className="text-end my-3">
                                <Button variant="outline-danger"  className="mx-2" onClick={handleClose}>Close</Button>
                                <Button variant="outline-primary" type="submit" onClick={handlepay} >Pay</Button>
                               </div>
                            </Form>
                        </Modal.Body>
                        
                    </Modal>

                </div>
                {paymentHistory && 
                <>
                   <Accordion>
                    <Accordion.Item eventKey="0" >
                        <Accordion.Header>Payment History</Accordion.Header>
                        <Accordion.Body className="overflow-auto">
                        {filterhistory?.sort((a, b) => new Date(b?.Paid_date) - new Date(a?.Paid_date))
                            .map((historyItem, index) => (
                                <ul key={index} className="list-style">
                                <li>
                                    Amount Paid : {historyItem?.Userpaid}, Method : {historyItem?.Usermethod}, Date : {historyItem?.Paid_date}
                                </li>
                                </ul>
                            ))}

                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>

                </>
                }
            </Container>
        </div>
    )
}