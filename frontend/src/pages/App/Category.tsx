import { CategoryCard } from '@/components/category/CategoryCard';
import { CategoryHeader } from '@/components/category/CategoryHeader';
import { AddCategoryModal } from '@/components/category/modals/AddCategoryModal';
import { DeleteCategoryModal } from '@/components/category/modals/DeleteCategoryModal';
import { EditCategoryModal } from '@/components/category/modals/EditCategoryModal';
import { MainLoader } from '@/components/ui/MainLoader';
import { useCategories } from '@/hooks/categories';
import { useColors } from '@/hooks/use-color';
import type { Category } from '@/types/category';
import { useState } from 'react';

export const CategoryPage = () => {
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: colors, isLoading: isColorsLoading } = useColors();

  const isLoading = isCategoriesLoading || isColorsLoading;

  if (isLoading) return <MainLoader />;

  return (
    <div>
      <CategoryHeader onOpenAddModal={() => setOpenAddCategory(true)} />
      <AddCategoryModal open={openAddCategory} setOpen={setOpenAddCategory} colors={colors} />
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
        {categories?.map((category, idx) => (
          <CategoryCard
            key={idx}
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
      </div>
    </div>
  );
};
