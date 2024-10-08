import './index.css';

const employmentTypesList = [
	{
		label: 'Full Time',
		employmentTypeId: 'FULLTIME',
	},
	{
		label: 'Part Time',
		employmentTypeId: 'PARTTIME',
	},
	{
		label: 'Freelance',
		employmentTypeId: 'FREELANCE',
	},
	{
		label: 'Internship',
		employmentTypeId: 'INTERNSHIP',
	},
];

const salaryRangesList = [
	{
		salaryRangeId: '1000000',
		label: '10 LPA and above',
	},
	{
		salaryRangeId: '2000000',
		label: '20 LPA and above',
	},
	{
		salaryRangeId: '3000000',
		label: '30 LPA and above',
	},
	{
		salaryRangeId: '4000000',
		label: '40 LPA and above',
	},
];

const FiltersGroup = (props) => {
	const {
		employmentTypeList,
		updateEmployementType,
		salaryRange,
		updateSalaryRange,
	} = props;
	const renderEmployementTypeFilterItem = (each) => {
		const { label, employmentTypeId } = each;
		const clickedCheckbox = () => {
			updateEmployementType(employmentTypeId);
		};
		const checkedState = employmentTypeList.includes(employmentTypeId);
		return (
			<li
				className="filter-item-container"
				key={employmentTypeId}
			>
				<input
					type="checkbox"
					className="checkbox"
					id={`checkbox-${employmentTypeId}`}
					onClick={clickedCheckbox}
					checked={checkedState}
				/>
				<label htmlFor={`checkbox-${employmentTypeId}`}>{label}</label>
			</li>
		);
	};
	const renderEmployementTypeFiltersList = () => (
		<div className="filters-container">
			<h1 className="filter-title">Types of Employement</h1>
			<ul className="filters-list">
				{employmentTypesList.map((each) =>
					renderEmployementTypeFilterItem(each)
				)}
			</ul>
		</div>
	);

	const renderSalaryFilterItem = (each) => {
		const { label, salaryRangeId } = each;
		const checkedState = salaryRangeId === salaryRange;
		const clickedRadio = () => {
			updateSalaryRange(salaryRangeId);
		};
		return (
			<li
				className="filter-item-container"
				key={salaryRangeId}
			>
				<input
					type="radio"
					className="radio"
					id={`radio-${salaryRangeId}`}
					checked={checkedState}
					onClick={clickedRadio}
				/>
				<label
					name="radio"
					htmlFor={`radio-${salaryRangeId}`}
				>
					{label}
				</label>
			</li>
		);
	};

	const renderSalaryFilterList = () => (
		<div className="filters-container">
			<h1 className="filter-title">Types of Employement</h1>
			<ul className="filters-list">
				{salaryRangesList.map((each) => renderSalaryFilterItem(each))}
			</ul>
		</div>
	);

	return (
		<div className="filters-main-container">
			<hr className="hr" />
			{renderEmployementTypeFiltersList()}
			<hr className="hr" />
			{renderSalaryFilterList()}
		</div>
	);
};
export default FiltersGroup;
