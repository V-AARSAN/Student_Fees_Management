import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, FormGroup, Row, Stack } from "react-bootstrap";
import '../assets/Css/Style.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Admin(){

    const[studentId,setStudentId] = useState();
    const[error,setError] = useState();

    const[data,setData] = useState([]);
    const navigate = useNavigate();

    const gotouserdetails = (e) =>{
        e.preventDefault();
        const filterdata = data.filter((data)=>data.Register == studentId)
        console.log(data)

        if(filterdata){
         navigate("/user")
        }else{
            setError(true)
            setTimeout(() => {
                setError(false)
            }, [3000]);
        }
    }
    localStorage.setItem('Student',JSON.stringify(studentId))

   
    //useEffect to render api data  
    useEffect(()=>{
        const getdata = () =>{

            axios.get(`http://localhost/backend/manage_user.php`)
            .then((res)=>{
                console.log(res.data)
                setData(res.data)
            })
        }
        getdata();
    },[])


    return(
        <>
        <div id="bg-image">
            <Container>
                <Row className=" d-flex align-items-center vh-100">
                    <Col lg={5} md={7} sm={12}  className="mx-auto">
                        <Card className="transparent shadow-lg ">
                            <Form className="text-center p-3" onSubmit={gotouserdetails}>
                                <Stack gap={3} >
                                <h3 className="fw-bold">ST<span className="text-decoration-underline">UDENT LO</span>GIN</h3>
                                <div className="text-center">
                                    <img src={require("../assets/images/g49065.png")}  width={'100px'}/>
                                </div>
                                <FormGroup as={Row} className="ps-5 pe-5 ">
                                    <Form.Label column lg={5} md={4} sm={12} className="fs-5" >Student Id :</Form.Label>
                                    <Col>
                                        <Form.Control type="text" placeholder="Register No" className="text-center  shadow-sm " onChange={(e)=>setStudentId(e.target.value)}/>
                                        { error && <p className="text-danger">invalid register Number</p>}
                                    </Col>
                                </FormGroup>
                                <div className="">
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