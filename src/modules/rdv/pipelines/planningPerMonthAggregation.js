const mongoose = require('mongoose');

const planningPerMonthAggregation = (firstDayOfMonth, lastDayOfMonth, staff) => {
	const ObjectId = mongoose.Types.ObjectId;
	return [
		{
			$lookup: {
				from: 'customers',
				localField: 'customer',
				foreignField: '_id',
				as: 'customer'
			}
		},
		{
			$unwind: {
				path: '$customer',
				preserveNullAndEmptyArrays: true
			}
		},
		{
			$lookup: {
				from: 'services',
				localField: 'service',
				foreignField: '_id',
				as: 'service'
			}
		},
		{
			$unwind: {
				path: '$service',
				preserveNullAndEmptyArrays: true
			}
		},
		{
			$lookup: {
				from: 'staffs',
				localField: 'employee',
				foreignField: '_id',
				as: 'staff'
			}
		},
		{
			$unwind: {
				path: '$staff',
				preserveNullAndEmptyArrays: true
			}
		},
		{
			$addFields: {
				dateRdv: {
					$convert: {
						input: "$date",
						to: "date",
						
					}
				}
			}
		},
		{
			$match : {
				$and: [
					{
						dateRdv : {
							// $gte: new Date(),
							$gte: new Date(firstDayOfMonth),
							$lt: new Date(lastDayOfMonth)
						},
						"staff._id": new ObjectId(staff)
					},
				]
			}
		},
		{
			$project: {
				_id: 1,
				amountPaid: 1,
				date: 1,
				startHour: 1,
				endHour:1,
				price:1,
				customer: {
					_id: 1,
					pseudo: 1,
					email: 1,
					phoneNumber: 1,
				},
				service: 1,
			}
		}
	]
}

module.exports = planningPerMonthAggregation;