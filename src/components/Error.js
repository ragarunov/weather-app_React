const Error = (errors) => {
    return (
        <div>
            <ul>
                {(errors.errors).map((error, i) => (
                    <li key={i}>{error.message} (code: {error.code})</li>
                ))}
            </ul>
        </div>
    )
}

export default Error
