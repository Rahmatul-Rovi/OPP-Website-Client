import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingBag, Truck, ShieldCheck, ChevronLeft, ArrowRight } from 'lucide-react';
import Swal from 'sweetalert2';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [mainImage, setMainImage] = useState(""); 
    
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // 🟢 Tumar local server URL maintain kora hoyeche
                const res = await axios.get(`http://localhost:5000/products/${id}`);
                setProduct(res.data);
                
                // Initial states setup
                setMainImage(res.data.image); // Single image field handle korar jonne
                if (res.data.sizes?.length > 0) setSelectedSize(res.data.sizes[0]);
                if (res.data.colors?.length > 0) setSelectedColor(res.data.colors[0]);
                
                window.scrollTo(0, 0);
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToBag = () => {
        if (product.stock <= 0) {
            return Swal.fire({
                icon: 'error',
                title: 'SOLD OUT',
                text: 'This vibe is currently out of the archive!',
                confirmButtonColor: '#000'
            });
        }

        // Add to cart logic using context
        addToCart({ ...product, selectedSize, selectedColor });
        
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'ADDED TO BAG',
            showConfirmButton: false,
            timer: 2000,
            background: '#000',
            color: '#fff'
        });
    };

    if (!product) return (
        <div className="h-screen flex flex-col items-center justify-center bg-white">
            <div className="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin mb-4"></div>
            <span className="uppercase font-black tracking-[0.4em] text-[10px]">Accessing Archive...</span>
        </div>
    );

    // 🟢 Effective Price Calculation (AdminPos er moto same logic)
    const hasDiscount = Number(product.discount) > 0;
    const discountedPrice = hasDiscount 
        ? Math.round(product.price - (product.price * product.discount / 100)) 
        : product.price;

return (
        <div className="bg-white min-h-screen">
            <div className="max-w-6xl mx-auto px-6 py-8 md:py-16">
                
                {/* 🟢 Navigation */}
                <Link to="/all-collection" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-8 w-fit text-gray-400 hover:text-black transition-colors">
                    <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
                    Back to Collection
                </Link>

                {/* Grid layout fix kora hoyeche (6:6 ratio) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                    
                    {/* --- LEFT: IMAGE SECTION (Col-6) --- */}
                    <div className="lg:col-span-6">
                        <div className="bg-gray-50 aspect-[4/5] max-h-[650px] overflow-hidden relative group rounded-sm shadow-sm">
                            <img 
                                src={mainImage} 
                                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
                                alt={product.title} 
                            />
                            
                            {/* Tags */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                {hasDiscount && (
                                    <span className="bg-black text-white px-2 py-1 font-black text-[8px] uppercase tracking-widest">
                                        -{product.discount}% OFF
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT: INFO SECTION (Col-6) --- */}
                    <div className="lg:col-span-6 flex flex-col">
                        <div className="mb-8">
                            <div className="flex items-center gap-3 text-gray-400 uppercase text-[9px] font-black tracking-[0.3em] mb-3">
                                <span className="text-black">{product.category}</span>
                                <span className="w-6 h-[1px] bg-gray-200"></span>
                                <span>Stock: {product.stock} Units</span>
                            </div>
                            
                            {/* Title size optimized */}
                            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 italic leading-tight">
                                {product.title}
                            </h1>

                            <div className="flex items-baseline gap-4">
                                <span className="text-3xl font-black italic text-black">
                                    ৳{discountedPrice}
                                </span>
                                {hasDiscount && (
                                    <span className="text-lg text-gray-300 line-through font-bold">
                                        ৳{product.price}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Description - Max width added for readability */}
                            <div className="border-t border-gray-50 pt-6">
                                <h4 className="text-[9px] font-black uppercase tracking-widest mb-3 opacity-40">The Details</h4>
                                <p className="text-gray-500 leading-relaxed text-[13px] max-w-sm">
                                    {product.description || "Premium archive piece. Limited drop."}
                                </p>
                            </div>

                            {/* Size Selection */}
                            {product.sizes && (
                                <div className="border-t border-gray-50 pt-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest">Select Size</h4>
                                        <button className="text-[8px] font-bold uppercase tracking-widest text-gray-400 hover:text-black">Size Chart</button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {product.sizes.map(size => (
                                            <button 
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`h-10 w-14 border text-[10px] font-black uppercase transition-all ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-100 hover:border-black'}`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="pt-4 space-y-3">
                                <button 
                                    onClick={handleAddToBag}
                                    disabled={product.stock <= 0}
                                    className={`w-full py-5 font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-3 ${
                                        product.stock <= 0 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                        : 'bg-black text-white hover:bg-zinc-900 active:scale-[0.99]'
                                    }`}
                                >
                                    <ShoppingBag size={16} />
                                    {product.stock <= 0 ? 'Out of Stock' : 'Add to Shopping Bag'}
                                </button>
                            </div>

                            {/* Service Badges - More compact layout */}
                            <div className="pt-8 border-t border-gray-50 flex gap-8">
                                <div className="flex items-center gap-3">
                                    <Truck size={16} className="text-gray-400" />
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black uppercase tracking-widest">Fast Ship</span>
                                        <span className="text-[7px] text-gray-400 uppercase">24-72 Hours</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ShieldCheck size={16} className="text-gray-400" />
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black uppercase tracking-widest">Original</span>
                                        <span className="text-[7px] text-gray-400 uppercase">Verified Quality</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;