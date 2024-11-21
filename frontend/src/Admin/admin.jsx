import { Card } from "flowbite-react"
function Admin() {
    return(
        <div className="Admin-container grid my-5 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
    <Card href="/admin/products/add" className="w-3/4 bg-gray-300 no-underline">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Add New Product
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Admins can add a new product into the product database
      </p>
    </Card>
    <Card href="/admin/products/" className="w-3/4 bg-gray-300 no-underline">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Products
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Admins can manage the products in the product database
      </p>
    </Card>
    <Card href="/admin/users/" className="w-3/4 bg-gray-300 no-underline">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Users
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Admins can manage the users present in the database
      </p>
    </Card>
    <Card href="/admin/business/" className="w-3/4 bg-gray-300 no-underline">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Business
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400 no-underline">
        Admins can manage businesses in the database
      </p>
    </Card>
        </div>
    )
}

export default Admin