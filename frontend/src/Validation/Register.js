import React from "react";
import { useState } from "react";
import {Container,Row,Col,Card, Form,Stack,InputGroup,Button} from "react-bootstrap"
import '../index.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useRef } from "react";


export default function Register(){

    const[name,setName] = useState();
    const[age,setAge] = useState();
    const[gender,setGender] = useState();
    const[phone,setPhone] = useState();
    const[email,setEmail] = useState(); 
    const[course,setCourse] = useState();
    const[fees,setFees] = useState();
    const[joindate,setJoinDate] = useState("");
    const[courseduration,setCourseDuration] = useState();
    const[username,setUsername] = useState();
    const[password,setPassword] = useState();
    const[change,setChange] = useState(true);
    const[validate,setValidate] = useState(false);
    const[Error,setError] = useState();
    const[Data,setData] = useState([]);
    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()

    const navigate = useNavigate();

    const gotologin = () => {
        navigate('/',{replace:true})
    }

    const fetch =() =>{
        axios.get('http://localhost:4000/login/catch')
         .then((res)=>{
            setData(res.data)
            console.log(res.data)
         })
    }


    useEffect(() => {
        fetch();
    }, []);

    
    const senddata = (e) => {
        e.preventDefault();
        if(!name || !age || !email || !phone || !course || !fees || !username || !password){
            setValidate(true)
            setError("please fill in all the fields")
            setTimeout(()=>{
                setValidate(false);
                setError("")
            },[3000])
        }else{
            const exist = Data.find((user)=>user.Username === username)
            console.log(exist)
            if(exist?.Username == username){
                console.log(exist.Username)
                setValidate(true)
                setError("The Username is already taken")
                setTimeout(()=>{
                    setValidate(false);
                    setError("")
                },[3000])
            }else{
               
                axios.post('http://localhost:4000/login/send',{
                Name:name,
                Age:age,
                Gender:gender,
                Phone:phone,
                Email:email,
                Course:course,
                Fees:fees,
                Join_Date:joindate,
                Courseduration:courseduration,
                Username:username,
                Password:password
            })
                .then((res)=>{
                    console.log(res.data)
                    setName("");
                    setAge("");
                    setGender("");
                    setPhone("");
                    setEmail("");
                    setCourse("");
                    setFees("");
                    setJoinDate("");
                    setCourseDuration("");
                    setUsername("");
                    setPassword("");
                    ref1.current.checked = false;
                    ref2.current.checked = false;
                    ref3.current.checked = false;

                })
            }
        }
       
        
    }


    return(

        <>
        <div className="image h-100 w-100">
            <Container>
                <Row>
                    <Col lg={8} className="mx-auto  mt-5">
                        <Card>
                            <Form  className='shadow bg-transparent'  >
                                <Container>
                                    <Stack gap={2} className="m-4">
                                        <h3 className=' mt-3 fs-2'><span className="text-decoration-underline ">Regi</span>ster_</h3>
                                        <Row>
                                            <Col lg={6} md={6} >
                                                <Form.Group className="m-1">
                                                    <InputGroup >
                                                        <InputGroup.Text ><i className="fa fa-user-circle ps-2 pe-2 fs-4"></i></InputGroup.Text>
                                                        <Form.Control type="text" placeholder='Name' value={name} onChange={(update)=>setName(update.target.value)} required/>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6} md={6} >
                                                <Form.Group className="m-1">
                                                    <InputGroup >
                                                        <InputGroup.Text ><i className="fa fa-vcard-o ps-2 pe-1 fs-4"></i></InputGroup.Text>
                                                        <Form.Control type="text" placeholder='Age' value={age} onChange={(update)=>setAge(update.target.value)} required/>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a valid state.
                                                        </Form.Control.Feedback>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Form.Group className="m-1">
                                            <InputGroup>
                                                <InputGroup.Text><i className="fa fa-users ps-2 pe-1 fs-4"></i></InputGroup.Text>
                                                <Form.Check type='radio' ref={ref1} className='mt-2 ms-4' style={{fontSize:'18px'}} label={'Male'}  name='gender' value="Male" checked={gender=="Male"}  onChange={(update)=>setGender(update.target.value)} />
                                                <Form.Check type='radio' ref={ref1}  className='mt-2 ms-4' style={{fontSize:'18px'}} label={'Female'} name='gender' value="Female" checked={gender=="Female"} onChange={(update)=>setGender(update.target.value)} />
                                                <Form.Check type='radio' ref={ref1} className='mt-2 ms-4' style={{fontSize:'18px'}} label={'Other'} name='gender' value="Other" checked={gender=="other"} onChange={(update)=>setGender(update.target.value)} />
                                            </InputGroup>
                                        </Form.Group>
                                        <Row>
                                            <Col lg={6} md={6} sm={12}>
                                                <Form.Group className="m-1">
                                                    <InputGroup >
                                                        <InputGroup.Text ><i className="fa fa-phone ps-2 pe-2 fs-4"></i></InputGroup.Text>
                                                        <Form.Control type="text" placeholder='Phone' value={phone} onChange={(update)=>setPhone(update.target.value)} required/>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6} md={6} sm={12}>
                                                <Form.Group className="m-1">
                                                    <InputGroup >
                                                        <InputGroup.Text><i className="fa fa-envelope ps-2 pe-1 fs-4"></i></InputGroup.Text>
                                                        <Form.Control type="text" placeholder='Email' value={email} onChange={(update)=>setEmail(update.target.value)} required/>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={6} md={6} sm={12}>
                                                <Form.Group className="m-1">
                                                    <InputGroup >
                                                        <InputGroup.Text><i className="fa fa-graduation-cap ps-2  fs-4"></i></InputGroup.Text>
                                                        <Form.Select value={course} onChange={(update)=>setCourse(update.target.value)} >
                                                            <option selected>Select Course Type</option>
                                                            <option value="MERN Stack Development">MERN Stack Development</option>
                                                            <option value="Full Stack Development">Full Stack Development</option>
                                                            <option value="Front-End Development">Front-End Development</option>
                                                            <option value="Back-End Development">Back-End Development</option>
                                                            <option value="AWS">AWS</option>
                                                            <option value="Designing">Designing</option>
                                                        </Form.Select>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6} md={6} sm={12}>
                                                <Form.Group className="m-1">
                                                    <InputGroup >
                                                        <InputGroup.Text><i className="fa fa-rupee ps-3 pe-2 fs-4"></i></InputGroup.Text>
                                                        <Form.Control value={fees} placeholder="Fees"  onChange={(update)=>setFees(update.target.value)} />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={6} md={6} sm={12}>
                                                <Form.Group className="m-1">
                                                    <InputGroup  >
                                                        <InputGroup.Text><i className="fa fa-calendar ps-2 pe-2 fs-4"></i></InputGroup.Text>
                                                        <Form.Control type="date" value={joindate} placeholder="Join date"    onChange={(update)=>setJoinDate(update.target.value)} />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6} md={6} sm={12}>
                                                <Form.Group className="m-1">
                                                    <InputGroup >
                                                        <InputGroup.Text><i className="fa fa-clock-o ps-2 pe-2 fs-4"></i></InputGroup.Text>
                                                        <Form.Select value={courseduration} onChange={(update)=>setCourseDuration(update.target.value)} >
                                                            <option selected>select Course Duration</option>
                                                            <option value="3 Months">3 Months</option>
                                                            <option value="6 Months">6 Months</option>
                                                            <option value="1 year">1 year</option>
                                                        </Form.Select>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={6} md={6} sm={12}>
                                                <Form.Group className="m-1">
                                                    <InputGroup >
                                                        <InputGroup.Text><i className="fa fa-user-plus ps-2 pe-1 fs-4"></i></InputGroup.Text>
                                                        <Form.Control type="text" placeholder='Username' value={username} onChange={(update)=>setUsername(update.target.value)} required/>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6} md={6} sm={12}>
                                                <Form.Group className="m-1">
                                                    <InputGroup >
                                                        <InputGroup.Text><i className="fa fa-lock ps-3 pe-2  fs-4"></i></InputGroup.Text>
                                                        <Form.Control type="password" placeholder='Password' value={password} onChange={(update)=>setPassword(update.target.value)} required/>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Stack>
                                    {validate && <p className="text-center text-danger">{Error}</p>}
                                    <div className=" mb-3 d-grid ms-4 me-4 ">
                                        <Button type="submit" variant="outline-primary" onClick={senddata}>Register</Button> 
                                    </div>
                                    <p className="text-center fs-6">Click to <a onClick={gotologin} className="fs-5 fw-bold" style={{cursor:'pointer'}}>Log in</a></p>
                                </Container>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}