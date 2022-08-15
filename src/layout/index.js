import React from 'react';
import Sidebar from "./Sidebar";
import Header from "./Header";

const Index = ({ children }) => {
	return (
	<section class="flex">
    <Sidebar />
    <section class="w-full overflow-y-auto h-screen overflow-x-hidden">
        <Header />
        {children}
    </section>
</section>
	)
}

export default Index;