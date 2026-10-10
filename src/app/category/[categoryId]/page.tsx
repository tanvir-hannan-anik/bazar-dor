
import CategoryDetailsContent from "@/component/CategoryDetailsContent";

const CategoryDetailsPage = async ({ params }) => {
    const { categoryId } = await params;

    const res = await fetch(
        `https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    const result = await res.json();

    return (
        <CategoryDetailsContent data={result} />
    );
};

export default CategoryDetailsPage;