import React from 'react';
import Nav from "./Nav";

const Index = ({ children }) => {
	return (
    <section>
    	<section style={{zoom:'85%'}}>
        {children}
        </section>
        <Nav />
    </section>
	)
}

export default Index;