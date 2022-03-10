import { useQuery } from "@apollo/client"
import { Box, Container, Heading, Button, Spinner, VStack, Text } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { GET_PRODUCTS } from "../query/schema"

export default function Home() {
  const { loading, error, data } = useQuery(GET_PRODUCTS)

  const router = useRouter()

  if (loading) return (
    <Spinner />
  )
  if (error) console.log(error)

  return (
    <Box mt={16}>
      <Container maxW="container.lg">
        <Heading mb={4}>Products List</Heading>
        <Link href="/add">
          <Button mb={8}>Add Product</Button>
        </Link>
        <VStack spacing="48px" align="start" mb={16}>
          {
            data.viewer.productList.map((i, iKey) => (
              <Box key={iKey}>
                <Text mb={2}>Name: {i.name}</Text>
                <Text mb={2}>Unit Price: {i.unitPrice}</Text>
                <Text mb={2}>Units In Stock: {i.unitsInStock}</Text>
                <Text mb={2}>Units On Order: {i.unitsOnOrder}</Text>
                <Button onClick={() => {
                  router.push({
                    pathname: "/product",
                    query: {
                      object: JSON.stringify(i),
                      operation: "View"
                    }
                  })
                }}>View Data</Button>
              </Box>
            ))
          }
        </VStack>
      </Container>
    </Box>
  )
}
