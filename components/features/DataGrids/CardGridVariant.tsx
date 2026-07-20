"use client";

import { useEffect, useState } from "react";
import { Sparkles, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { generateProductData, Product } from "@/lib/mockData";

interface CardGridVariantProps {
  productCount?: number;
  columns?: number;
  enableFiltering?: boolean;
}

export default function CardGridVariant({
  productCount = 12,
  columns = 3,
  enableFiltering = true,
}: CardGridVariantProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"price" | "rating" | "stock">("price");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    setProducts(generateProductData(productCount));
    setCurrentPage(1);
  }, [productCount]);

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  // Filtering
  const filteredProducts = enableFiltering
    ? products.filter((p) => activeCategory === "All" || p.category === activeCategory)
    : products;

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];
    return sortOrder === "asc" ? valA - valB : valB - valA;
  });

  // Pagination
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(sortedProducts.length / pageSize);

  const toggleSort = (type: "price" | "rating" | "stock") => {
    if (sortBy === type) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(type);
      setSortOrder("asc");
    }
  };

  const gridCols =
    columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : columns === 3
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <div className="space-y-6">
      {/* Filtering & Sorting Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm select-none">
        {/* Category Tabs */}
        {enableFiltering && (
          <div className="flex flex-wrap gap-1.5 max-w-full overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-50 dark:bg-slate-950 text-slate-500 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Sort Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
            <ArrowUpDown size={12} />
            Sort:
          </span>
          {(["price", "rating", "stock"] as const).map((type) => (
            <button
              key={type}
              onClick={() => toggleSort(type)}
              className={`px-2.5 py-1 rounded text-xs font-bold transition-all border cursor-pointer ${
                sortBy === type
                  ? "border-blue-500 text-blue-600 bg-blue-50/20 dark:text-blue-400"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-500 hover:text-foreground"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}{" "}
              {sortBy === type && (sortOrder === "asc" ? "↑" : "↓")}
            </button>
          ))}
        </div>
      </div>

      {/* Product Card Grid */}
      {paginatedProducts.length > 0 ? (
        <div className={`grid ${gridCols} gap-6`}>
          {paginatedProducts.map((prod) => (
            <div
              key={prod.id}
              className="group relative flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all select-none overflow-hidden"
            >
              {/* Product Visual Area */}
              <div className="w-full h-32 rounded-lg bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20 border border-slate-100 dark:border-slate-850 flex items-center justify-center overflow-hidden mb-4 relative">
                <Sparkles size={24} className="text-blue-500/30 group-hover:scale-110 transition-transform duration-300" />
                <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-500">
                  ID: {prod.id}
                </span>
              </div>

              {/* Product Metadata */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {prod.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        prod.status === "In Stock"
                          ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900"
                          : prod.status === "Low Stock"
                          ? "bg-yellow-50 text-yellow-700 border border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-400 dark:border-yellow-900"
                          : "bg-red-50 text-red-755 border border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900"
                      }`}
                    >
                      {prod.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground mt-1 tracking-tight group-hover:text-blue-500 transition-colors">
                    {prod.name}
                  </h4>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-3 mt-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Price</span>
                    <span className="text-base font-extrabold text-foreground">${prod.price}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Rating</span>
                    <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400 flex items-center gap-0.5">
                      ★ {prod.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400">
          <span className="text-sm italic">No products found in this category.</span>
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-3 shadow-sm select-none">
          <span className="text-xs font-semibold text-slate-500">
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
