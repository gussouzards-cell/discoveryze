import { Suspense } from "react";
import { ProductGuideView } from "@/components/product/product-guide-view";

export default function GuiaPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[100dvh] items-center justify-center bg-background text-muted-foreground">
          Carregando guia…
        </div>
      }
    >
      <ProductGuideView />
    </Suspense>
  );
}
