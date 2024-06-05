import NavBar from "../components/Navbar.jsx";
import "../styles/Home.css";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Text,
    Image,
    Stack,
    ButtonGroup,
    Heading,
    Divider,
    Center,
} from "@chakra-ui/react";
import img from "../assets/zdz9mr_blackBear.png";

function Home() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const arr = ["name", "name", "name", "name"];

    return (
        <>
            <div>
                <NavBar />
                <div className="content">
                    <h1>Cheffed</h1>
                    <h3>Your digital cookbook</h3>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: "10px",
                            justifyContent: "center",
                        }}
                    >
                        {arr.map((item) => (
                            <div key={item.name}>
                                <Card
                                    bg="#EADDCF"
                                    width="200px"
                                    height="175px"
                                    borderRadius="15"
                                    marginTop="30px"
                                    marginRight="15px"
                                    onClick={onOpen}
                                >
                                    <CardBody>
                                        <Image
                                            src={img}
                                            width="100%"
                                            height="55%"
                                            borderTopRadius="15"
                                            onClick={onOpen}
                                        />
                                        <Text marginLeft="15px">{item}</Text>
                                    </CardBody>
                                </Card>
                            </div>
                        ))}
                    </div>
                    <Modal
                        isOpen={isOpen}
                        onClose={onClose}
                        borderRadius="20px"
                    >
                        <ModalOverlay
                            style={{
                                backgroundColor: "rgba(0, 0, 0, 0.2)",
                                backdropFilter: "blur(2px)",
                            }}
                        />
                        <ModalContent
                            marginTop="20%"
                            marginLeft="36%"
                            width="400px"
                            height="200px"
                            bg="#EADDCF"
                            borderRadius="20px"
                        >
                            <ModalHeader textAlign="center" color="55423D">
                                Recipe name
                            </ModalHeader>
                            <ModalBody></ModalBody>

                            <ModalFooter>
                                <button style={{ backgroundColor: "#55423D", color:"#EADDCF",borderRadius:"10px", height:"2em",width:"7em", border:"none", marginTop:"11em", marginRight:".5em"}}>
                                    See full recipe
                                </button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </div>
            </div>
        </>
    );
}

export default Home;
