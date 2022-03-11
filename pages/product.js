import { useQuery } from "@apollo/client"
import { Box, Container, Heading, Text, Input, Button, HStack, Spinner, Center } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { GET_PRODUCT } from "../query/schema"

export default function Product() {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [unitPrice, setUnitPrice] = useState(0)
  const [unitsInStock, setUnitsInStock] = useState(0)
  const [unitsOnOrder, setUnitsOnOrder] = useState(0)

  const { loading, error, data, refetch } = useQuery(GET_PRODUCT, {
    variables: {
      filter: {
        _id: id
      }
    }
  })

  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query

      setId(id)

      if (data) {
        setName(data.viewer.product.name)  
        setUnitPrice(data.viewer.product.unitPrice)
        setUnitsInStock(data.viewer.product.unitsInStock)
        setUnitsOnOrder(data.viewer.product.unitsOnOrder)
      }

      refetch()
    }
  }, [router.isReady, data])

  if (loading) return (
    <Center h="750px">
      <Spinner size="xl" color="blue.500" />
    </Center> 
  )
  if (error) console.log(error)

  const safeParseFloat = (str) => {
    const value = Number.parseFloat(str)
    return Number.isNaN(value) ? "" : value
  }

  return (
    <Box mt={16}>
      <Container maxW="container.lg">
        <Heading mb={4}>View Product</Heading>
        <Link href="/">
          <Button mb={6}>Go Back</Button>
        </Link>
        <Text mb={2}>Name</Text>
        <Input
          value={name} 
          onChange={(e) => setName(e.target.value)}
          mb={2}
        />
        <Text mb={2}>Unit Price</Text>
        <Input 
          value={unitPrice}
          min="0"
          onChange={(e) => setUnitPrice(safeParseFloat(e.target.value))}
          mb={2}
        />
        <Text mb={2}>Units In Stock</Text>
        <Input 
          value={unitsInStock}
          min="0"
          onChange={(e) => setUnitsInStock(safeParseFloat(e.target.value))}
          mb={2}
        />
        <Text mb={2}>Units On Order</Text>
        <Input 
          value={unitsOnOrder}
          min="0"
          onChange={(e) => setUnitsOnOrder(safeParseFloat(e.target.value))}
          mb={8}
        />
        <HStack spacing="16px">
          <Button onClick={() => {
            router.push({
              pathname: "/update",
              query: {
                object: JSON.stringify({
                  recordId: id,
                  record: {
                    name: name,
                    unitPrice: unitPrice,
                    unitsInStock: unitsInStock,
                    unitsOnOrder: unitsOnOrder
                  }
                })
              }
            })
          }}>Update</Button>
          <Button onClick={() => {
            router.push({
              pathname: "/remove",
              query: {
                id: id
              }
            })
          }}>Delete</Button>
        </HStack>
      </Container>
    </Box>
  )
}
