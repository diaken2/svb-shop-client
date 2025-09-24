import { generateProductMetadata } from '@/lib/seo-utils';
import { getProductsFromCode } from '@/lib/data-service';
import ProductPage from './ProductPage';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return await generateProductMetadata(id);
}

export default async function ProductPageWrapper({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  try {
    // Запрашиваем продукт из API
    const response = await fetch(`https://svb-shop-back.onrender.com/api/products/${id}`, {
      next: { revalidate: 60 } // Кэшируем на 60 секунд
    });
    
    if (!response.ok) {
      throw new Error('Product not found');
    }
    
    const data = await response.json();
    
    if (!data.ok || !data.product) {
      return <div>Товар не найден</div>;
    }

    const product = data.product;

    // Структурированные данные для товара
    const productStructuredData = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "image": product.image,
      "brand": {
        "@type": "Brand",
        "name": "SVB SHOP"
      },
      "offers": {
        "@type": "Offer",
        "price": product.price,
        "priceCurrency": "RUB",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "SVB SHOP - ТВ без подписок"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "124"
      }
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productStructuredData),
          }}
        />
        <ProductPage product={product} />
      </>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    return <div>Товар не найден</div>;
  }
} 