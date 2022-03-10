import { useMutation } from "@apollo/client"
import { Box, Center, Spinner } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { UPDATE_PRODUCT } from "../query/schema"

export default function Update() {
  const [ updateProduct, { data, loading, error } ] = useMutation(UPDATE_PRODUCT)

  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      const { object, label } = router.query
      const product = JSON.parse(object)

      if (label === "Created") {
        console.log(product)
        handleUpdate(
          product.createProduct.recordId, 
          product.createProduct.record.name, 
          product.createProduct.record.unitPrice,
          product.createProduct.record.unitsInStock,
          product.createProduct.record.unitsOnOrder
        )
      }
    }
  }, [router.isReady])

  if (loading) return (
    <Center h="750px">
      <Spinner size="xl" color="blue.500" />
    </Center> 
  )
  if (error) console.log(error)
  if (data) {
    alert("Product Updated Succesfully!")
    router.push({
      pathname: "/product",
      query: {
        object: JSON.stringify(data),
        operation: "Update"
      }
    })
  }

  const handleUpdate = (id, name, unitPrice, unitsInStock, unitsOnOrder) => {
    console.log(id)
    console.log(name)
    updateProduct({
      variables: {
        id: id,
        record: {
          name: name,
          unitPrice: unitPrice,
          unitsInStock: unitsInStock,
          unitsOnOrder: unitsOnOrder
        }
      }
    })
  }

  return (
    <Box />
  )
}