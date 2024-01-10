import React, { useState } from "react";
import { Button, Card, Col, Container, Form, FormGroup, Row, Stack } from "react-bootstrap";
import '../assets/Css/Style.css';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

export default function Admin(){
    
    const[adminId,setAdminId] = useState();
    const[password,setPassword] = useState();
    const[foramte,setFormated] = useState([]);
    const[erroradmin, setErrorAdmin] = useState(false);
    const[errorpassword, setErrorpassword] = useState(false);

    const navigate = useNavigate();

    const gotomanage = (e) => {

        e.preventDefault();

        if (adminId == "admin" && password == "admin"){
            
          navigate("/manage");

        } else {
          if (adminId !== "admin") {
            setErrorAdmin(true);
            setTimeout(() => {
                setErrorAdmin(false);
            }, 4000);
          }
          if (password !== "admin") {
            setErrorpassword(true);
            setTimeout(() => {
                setErrorpassword(false);
            }, 4000);
          }
      
        }
      };

      const Passdata = {
        admin : "admin",
        password : "password"
      }
      localStorage.setItem('Pass', JSON.stringify(Passdata));

    

    return(
        <>
        <div id="bg-image">
            <Container>
                <Row className=" d-flex align-items-center vh-100">
                    <Col lg={5} md={7} sm={12}  className="mx-auto">
                        <Card className="transparent shadow-lg ">
                            <Form className="text-center p-3" onSubmit={gotomanage}>
                                <Stack  gap={3}>
                                <h3 className="fw-bold">AD<span className="text-decoration-underline">MIN LO</span>GIN</h3>
                                <div className="text-center">
                                    <img src={require("../assets/images/g49065.png")}  width={'100px'}/>
                                </div>
                                <FormGroup className="ps-5 pe-5 ">
                                    <Col>
                                        <Form.Control type="text" placeholder="admin id" className="text-center  shadow-sm" onChange={(e)=>setAdminId(e.target.value)} required/>
                                        
                                    </Col>
                                </FormGroup>
                                {erroradmin && <p className="text-danger">Admin id invalid</p>}
                                <FormGroup className="ps-5 pe-5 ">
                                <Col >
                                        <Form.Control type="password" placeholder="password " className="text-center shadow-sm" onChange={(e)=>setPassword(e.target.value)} required/>
                                    </Col>
                                </FormGroup>
                                {errorpassword && <p className="text-danger">Password invalid</p>}
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