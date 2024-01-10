import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, FormGroup, InputGroup, Row, Stack } from "react-bootstrap";
import '../assets/Css/Style.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Admin(){

    const[register, setRegiter] = useState();
    const[name,setName] = useState();
    const[DOB,setDOB] = useState("");
    const[email,setEmail] = useState();
    const[phone,setPhone] = useState();
    const[department,setdepartment] = useState();
    const[amount,setAmount] = useState();
    const[duedate,setDueDate] = useState("");
    const[emailError,setEmailError] = useState(false);
    const[registerError,setRegistorError] = useState(false);
    const[checkdata,setData] = useState([{}]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        const historyArray = Array.isArray(checkdata) ? checkdata : [];
        const checkregister = historyArray.find((item) => item.Register === register);
        const checkemail = historyArray.find((item) => item.Email === email);
    
        if (checkregister || checkemail) {
            if(checkregister){
                setRegistorError(true)
                setTimeout(()=>{
                    setRegistorError(false)
                },[3000])
            }
            if(checkemail){
                setEmailError(true)
                setTimeout(()=>{
                    setEmailError(false)
                },[3000])
            }
        } else {
            data.append('register', register);
            data.append('name', name);
            data.append('dob', DOB);
            data.append('email', email);
            data.append('phone', phone);
            data.append('department', department);
            data.append('amount', amount);
            data.append('due', duedate);
    
            axios.post(`http://localhost/backend/add_user.php`, data)
            .then((res) => {
                console.log(res.data);
                navigate("/manage");
            })
        }
    };
    
    const navigate = useNavigate();

    const gotomanage = () =>{

        navigate("/manage")
    }
    const getdata = () =>{

        axios.get(`http://localhost/backend/manage_user.php`)
        .then((res)=>{
            console.log(res.data)
            setData(res.data)
        })
    }
    useEffect(()=>{
        getdata();
    },[])

    return(
        <>
        <div id="adduser">
            <Container>
                <Row className=" d-flex align-items-center vh-100">
                    <Col lg={6} md={7} sm={12}  className="mx-auto">
                        <Card className="transparency shadow-lg p-3  ">
                            <Form className="text-center p-3" onSubmit={handleSubmit}>
                                <h3 className="fw-bold text-start pb-2">Add Student</h3>
                                <Stack gap={3} >
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Text style={{padding:'0px 8px'}}>Register No</InputGroup.Text>
                                        <Form.Control type="text" placeholder="Enter Your Name" onChange={(e)=>setRegiter(e.target.value)} />
                                    </InputGroup>
                                    {registerError && <p className="text-danger text-center fw-bold pb-0 mb-0">Registor Number already exist</p>}
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Text style={{padding:'0px 28px'}}>Name</InputGroup.Text>
                                        <Form.Control type="text" placeholder="Enter Your Name" onChange={(e)=>setName(e.target.value)}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Text style={{padding:'0px 33px'}}>DOB</InputGroup.Text>
                                        <Form.Control type="date" placeholder="Enter Your Name" onChange={(e)=>setDOB(e.target.value)}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Text style={{padding:'0px 22px'}}>Email Id</InputGroup.Text>
                                        <Form.Control type="text" placeholder="Enter Your Email" onChange={(e)=>setEmail(e.target.value)}/>
                                    </InputGroup>
                                    {emailError && <p className="text-danger text-center fw-bold pb-0 mb-0">Email already exist</p>}
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Text style={{padding:'0px 14px'}}>Phone No</InputGroup.Text>
                                        <Form.Control type="text" placeholder="Enter Your Number" onChange={(e)=>setPhone(e.target.value)}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Text style={{padding:'0px 7px'}}>Department</InputGroup.Text>
                                        <Form.Control type="text" placeholder="Enter Your Dept" onChange={(e)=>setdepartment(e.target.value)}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Text style={{padding:'0px 21px'}}>Amount</InputGroup.Text>
                                        <Form.Control type="text" placeholder="Enter Amount" onChange={(e)=>setAmount(e.target.value)}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Text style={{padding:'0px 17px'}}>Due Date</InputGroup.Text>
                                        <Form.Control type="date" placeholder="Enter Date" onChange={(e)=>setDueDate(e.target.value)}/>
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
            </Container>
        </div>
        </>
    )
}