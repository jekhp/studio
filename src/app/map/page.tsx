export default function MapPage() {
    const mapSrc = "https://www.google.com/maps/embed/v1/search?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=festivals+in+Cusco+Peru";

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline text-foreground">Festival Map</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    Explore the locations of Cusco&apos;s vibrant festivals on the map below.
                </p>
            </div>
            <div className="aspect-[16/9] w-full bg-muted rounded-lg shadow-lg overflow-hidden">
                 <iframe
                    src={`https://www.google.com/maps/embed/v1/search?q=festivals%20in%20Cusco%20Peru&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
}
