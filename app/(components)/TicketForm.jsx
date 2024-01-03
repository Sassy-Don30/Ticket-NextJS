'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const TicketForm = ({ ticket }) => {
	const EDITMODE = ticket._id == 'new' ? false : true;
	const router = useRouter();

	const startingTicketData = {
		title: EDITMODE ? ticket.title : '',
		description: EDITMODE ? ticket.description : '',
		priority: EDITMODE ? ticket.priority : 1,
		progress: EDITMODE ? ticket.progress : 0,
		status: EDITMODE ? ticket.status : 'not started',
		category: EDITMODE ? ticket.category : 'Hardware Problem',
	};

	const handleChange = (e) => {
		const value = e.target.value;
		const name = e.target.name;

		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (EDITMODE) {
			const res = await fetch(`/api/Tickets/${ticket._id}`, {
				'method': 'PUT',
				'body': JSON.stringify({ formData }),
				'content-type': 'application/json',
			});

			if (!res.ok) {
				throw new Error('Failed to update ticket');
			}
		} else {
			const res = await fetch('/api/Tickets', {
				'method': 'POST',
				'body': JSON.stringify({ formData }),
				'content-type': 'application/json',
			});

			if (!res.ok) {
				throw new Error('Failed to create ticket');
			}
		}
		router.refresh();
		router.push('/');
	};

	const [formData, setFormData] = useState(startingTicketData);
	return (
		<div className='flex justify-center'>
			<form
				action=''
				className='flex flex-col gap-3 w-1/2'
				method='post'
				onSubmit={handleSubmit}
			>
				<h3>{EDITMODE ? 'Edit your ticket' : 'Create your ticket'}</h3>
				<label>Title</label>
				<input
					type='text'
					id='title'
					name='title'
					onChange={handleChange}
					required={true}
					value={formData.title}
				/>
				<label>Description</label>
				<textarea
					id='description'
					name='description'
					onChange={handleChange}
					required={true}
					value={formData.description}
					rows='5'
				/>

				<label>Category</label>
				<select
					name='category'
					value={formData.category}
					onChange={handleChange}
				>
					<option value='Hardware Problem'>Hardware Problem</option>
					<option value='Software Problem'>Software Problem</option>
					<option value='Project'>Project</option>
				</select>
				<label>Priority</label>
				<div>
					<input
						id='priority-1'
						name='priority'
						type='radio'
						onChange={handleChange}
						value={1}
						checked={formData.priority == 1}
					/>
					<label>1</label>
					<input
						id='priority-2'
						name='priority'
						type='radio'
						onChange={handleChange}
						value={2}
						checked={formData.priority == 2}
					/>
					<label>2</label>
					<input
						id='priority-3'
						name='priority'
						type='radio'
						onChange={handleChange}
						value={3}
						checked={formData.priority == 3}
					/>
					<label>3</label>
					<input
						id='priority-4'
						name='priority'
						type='radio'
						onChange={handleChange}
						value={4}
						checked={formData.priority == 4}
					/>
					<label>4</label>
					<input
						id='priority-5'
						name='priority'
						type='radio'
						onChange={handleChange}
						value={5}
						checked={formData.priority == 5}
					/>
					<label>5</label>
				</div>
				<label>Progress</label>
				<input
					type='range'
					id='progress'
					name='progress'
					value={formData.progress}
					min='0'
					max='100'
					onChange={handleChange}
					style={{
						width: '100%',
						background: `linear-gradient(to right, #2196F3 ${formData.progress}%, #ccc ${formData.progress}%)`,
						appearance: 'none',
						height: '5px', // Set a height for the range bar
						outline: 'none', // Remove default outline
						cursor: 'pointer', // Show pointer cursor on hover
					}}
				/>
				<label>Status</label>
				<select
					name='status'
					value={formData.status}
					onChange={handleChange}
				>
					<option value='not started'>Not Started</option>
					<option value='started'>Started</option>
					<option value='Done'>Done</option>
				</select>
				<input
					type='submit'
					className='btn max-w-xs'
					value={EDITMODE ? 'Update ticket' : 'Create ticket'}
				/>
			</form>
		</div>
	);
};

export default TicketForm;
