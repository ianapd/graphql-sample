import { useQuery } from "@apollo/client"
import { Box, Container, Heading, Button, Spinner, Text, Center, Grid } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { GET_PRODUCTS } from "../query/schema"

export default function Home() {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS)

  const router = useRouter()

  useEffect(() => {
    refetch()
  }, [])

  if (loading) return (
    <Center h="750px">
      <Spinner size="xl" color="blue.500" />
    </Center> 
  )
  if (error) console.log(error)
  if (data) console.log(data)

  return (
    <Box mt={16}>
      <Container maxW="container.lg">
        <Heading mb={4}>GraphQL Sample</Heading>
        <Text mb={8}>A sample project showing the use of useQuery and useMutation of apollo client to get and modify data from the server.</Text>
        <Heading mb={4}>Products List</Heading>
        <Link href="/add">
          <Button mb={8}>Add Product</Button>
        </Link>
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={12} mb={16}>
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
                      id: i._id
                    }
                  })
                }}>View Data</Button>
              </Box>
            ))
          }
        </Grid>
      </Container>
    </Box>
  )
}
