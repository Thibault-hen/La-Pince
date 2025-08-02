import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { CategoryCard } from '@/components/category/CategoryCard';
import { CategoryHeader } from '@/components/category/CategoryHeader';
import { CategorySkeleton } from '@/components/category/CategorySkeleton';
import { AddCategoryModal } from '@/components/category/modals/AddCategoryModal';
import { DeleteCategoryModal } from '@/components/category/modals/DeleteCategoryModal';
import { EditCategoryModal } from '@/components/category/modals/EditCategoryModal';
import { useCategories } from '@/hooks/use-category';
import { useColors } from '@/hooks/use-color';
import { DefaultWrapper } from '@/layouts/DefaultWrapper';
import type { Category } from '@/types/category';

const CategoryPage = () => {
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: colors, isLoading: isColorsLoading } = useColors();

  const isLoading = isCategoriesLoading || isColorsLoading;

  if (isLoading) {
    return (
      <div className="3xl:py-4 3xl:px-26 space-y-6 p-6">
        <CategorySkeleton />
      </div>
    );
  }

  return (
    <DefaultWrapper key={String(isLoading)}>
      <div className="3xl:py-4 3xl:px-26 space-y-6 p-6">
        <CategoryHeader onOpenAddModal={() => setOpenAddCategory(true)} />
        <AddCategoryModal
          open={openAddCategory}
          setOpen={setOpenAddCategory}
          colors={colors}
        />
        <EditCategoryModal
          open={openEditCategory}
          setOpen={setOpenEditCategory}
          category={selectedCategory}
          colors={colors}
        />
        <DeleteCategoryModal
          open={openDeleteCategory}
          setOpen={setOpenDeleteCategory}
          category={selectedCategory}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          <AnimatePresence mode="popLayout">
            {categories?.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onOpenEditModal={() => {
                  setOpenEditCategory(true);
                  setSelectedCategory(category);
                }}
                onOpenDeleteModal={() => {
                  setOpenDeleteCategory(true);
                  setSelectedCategory(category);
                }}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </DefaultWrapper>
  );
};

export default CategoryPage;
