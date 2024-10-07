import { useState, useEffect } from "react";
import Pagination from "../components/pagination";
import "../App.css";

function Customers() {
	const [customers, setCustomers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const pagelength = 12;

	useEffect(() => {
		fetch('http://localhost:8080/api/customers/list')
			.then((response) => response.json())
			.then((data) => setCustomers(data));
	}, []);

	console.log(customers);

	const lastCust = currentPage * pagelength;
	const firstCust = lastCust - pagelength;

	const filteredData = customers.filter((item) => {
		const id = item.customer_id.toString().includes(searchTerm);
		const first = item.first_name.toLowerCase().includes(searchTerm.toLowerCase());
		const last = item.last_name.toLowerCase().includes(searchTerm.toLowerCase());
		return id || first || last;
	});

	const currentCustomers = filteredData.slice(firstCust, lastCust);
	const totalPages = Math.ceil(filteredData.length / pagelength);

	const onPageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<div className="App">
			<h1>Customers</h1>
			<input
				type="text"
				placeholder="Search by ID, first name or last name"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				style={{ width: "220px" }} />

			<div className="page-grid header-customer">
				<div>Id</div>
				<div>First Name</div>
				<div>Last Name</div>
				<div>Email</div>
				<div>Active?</div>
				<div>Create Date</div>
				<div>Rental Count</div>
			</div>

			<div>
				{
					currentCustomers.map((customer) => (
						<div className="page-grid customer" key={customer.customer_id}>
							<div>{customer.customer_id}</div>
							<div>{customer.first_name}</div>
							<div>{customer.last_name}</div>
							<div>{customer.email}</div>
							<div>{customer.active ? 'Yes' : 'No'}</div>
							<div>{customer.create_date}</div>
							<div>{customer.rental_count}</div>
						</div>
					))
				}
			</div>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={onPageChange}
			/>
		</div>
	);
};

export default Customers;
