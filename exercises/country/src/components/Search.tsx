interface PropTypes {
    search: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const Search = ({search, onChange}: PropTypes) => {
    return (
        <label className="search">
            Find countries: 
            <input type="text"  value={search} onChange={onChange} />
        </label>
    )
}

export default Search;