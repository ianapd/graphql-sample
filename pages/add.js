import { useMutation } from "@apollo/client"
import { Box, Container, Heading, Text, Input, Button, Spinner, Center } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { CREATE_PRODUCT } from "../query/schema"

export default function Add() {
  const [name, setName] = useState("")
  const [unitPrice, setUnitPrice] = useState(0)
  const [unitsInStock, setUnitsInStock] = useState(0)
  const [unitsOnOrder, setUnitsOnOrder] = useState(0)

  const [ createProduct, { data, loading, error } ] = useMutation(CREATE_PRODUCT)

  const router = useRouter()

  if (loading) return (
    <Center h="750px">
      <Spinner size="xl" color="blue.500" />
    </Center> 
  )
  if (error) console.log(error)
  if (data) {
    alert("Product Added Succesfully!")
    router.push({
      pathname: "/product",
      query: {
        id: data.createProduct.recordId
      }
    })
  } 

  const handleSubmit = (e) => {
    e.preventDefault()

    createProduct({
      variables: {
        record: {
          name: name,
          unitPrice: unitPrice,
          unitsInStock: unitsInStock,
          unitsOnOrder: unitsOnOrder
        }
      }
    })
  }

  const safeParseFloat = (str) => {
    const value = Number.parseFloat(str)
    return Number.isNaN(value) ? 0 : value
  }

  return (
    <Box mt={16}>
      <Container maxW="container.lg">
        <Heading mb={4}>Add Product</Heading>
        <Link href="/">
          <Button mb={6}>Go Back</Button>
        </Link>
        <Text mb={2}>Name</Text>
        <Input 
          onChange={(e) => setName(e.target.value)}
          mb={2}
        />
        <Text mb={2}>Unit Price</Text>
        <Input 
          onChange={(e) => setUnitPrice(safeParseFloat(e.target.value))}
          min="0"
          mb={2}
        />
        <Text mb={2}>Units In Stock</Text>
        <Input 
          onChange={(e) => setUnitsInStock(safeParseFloat(e.target.value))}
          min="0"
          mb={2}
        />
        <Text mb={2}>Units in Order</Text>
        <Input 
          onChange={(e) => setUnitsOnOrder(safeParseFloat(e.target.value))}
          min="0"
          mb={8}
        />
        <Button onClick={(e) => {
          handleSubmit(e)
        }}>Add</Button>
      </Container>
    </Box>
  )
}
