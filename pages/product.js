import { Box, Container, Heading, Text, Input, Button, HStack, Spinner } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Product() {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [unitPrice, setUnitPrice] = useState(0)
  const [unitsInStock, setUnitsInStock] = useState(0)
  const [unitsOnOrder, setUnitsOnOrder] = useState(0)

  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      const { object, operation } = router.query
      const product = JSON.parse(object)
  
      if (operation === "Add") {
        setId(product.createProduct.recordId)
        setName(product.createProduct.record.name)
        setUnitPrice(product.createProduct.record.unitPrice)
        setUnitsInStock(product.createProduct.record.unitsInStock)
        setUnitsOnOrder(product.createProduct.record.unitsOnOrder)
      } else if (operation === "Update") {
        setId(product.updateProduct.recordId)
        setName(product.updateProduct.record.name)
        setUnitPrice(product.updateProduct.record.unitPrice)
        setUnitsInStock(product.updateProduct.record.unitsInStock)
        setUnitsOnOrder(product.updateProduct.record.unitsOnOrder)
      } else if (operation === "View") {
        setId(product._id)
        setName(product.name)
        setUnitPrice(product.unitPrice)
        setUnitsInStock(product.unitsInStock)
        setUnitsOnOrder(product.unitsOnOrder)
      }
    }
  }, [router.isReady])

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
                  createProduct: {
                    recordId: id,
                    record: {
                      name: name,
                      unitPrice: unitPrice,
                      unitsInStock: unitsInStock,
                      unitsOnOrder: unitsOnOrder
                    }
                  }
                }),
                label: "Created"
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
