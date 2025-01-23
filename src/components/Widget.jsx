


function Widget() {
    const links = ['https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7261431343459295232',
        'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7221928100626939904',
        'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7221836061138726912',
    ];
    const index = Math.floor(Math.random() * (3));
    // console.log(index, links[index])
    return <div className="ml-6 h-[790px] max-h-[790px]">
        <iframe src={links[index]} title="Embedded Post" className="w-fit 2xl:min-w-[400px] h-full" frameborder="0"/>       
    </div>
}

export default Widget;