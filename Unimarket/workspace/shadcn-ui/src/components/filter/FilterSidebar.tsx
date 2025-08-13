import { useState } from 'react';
import { ChevronDown, ChevronUp, Filter as FilterIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Filter } from '@/types';

interface FilterSidebarProps {
  filters: Filter;
  onFiltersChange: (filters: Filter) => void;
}

const categories = [
  'Electronics & Gadgets',
  'Sports Equipment',
  'Books & Study Materials',
  'Furniture',
  'Clothing & Accessories',
  'Musical Instruments',
  'Gaming',
  'Kitchen & Appliances',
  'Other'
];

const conditions = [
  { value: 'new', label: 'New' },
  { value: 'like-new', label: 'Like New' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'poor', label: 'Poor' }
];

export const FilterSidebar = ({ filters, onFiltersChange }: FilterSidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: string) => {
    const numValue = value === '' ? undefined : parseFloat(value);
    onFiltersChange({
      ...filters,
      [field]: numValue
    });
  };

  const handleConditionChange = (condition: string, checked: boolean) => {
    const currentConditions = filters.condition || [];
    const newConditions = checked
      ? [...currentConditions, condition]
      : currentConditions.filter(c => c !== condition);
    
    onFiltersChange({
      ...filters,
      condition: newConditions.length > 0 ? newConditions : undefined
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  return (
    <Card className="sticky top-20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FilterIcon className="h-4 w-4" />
            Filters
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Sort By */}
          <div>
            <Label className="text-sm font-medium">Sort By</Label>
            <Select
              value={filters.sortBy || 'newest'}
              onValueChange={(value) => onFiltersChange({ ...filters, sortBy: value as any })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="views">Most Viewed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Category */}
          <div>
            <Label className="text-sm font-medium">Category</Label>
            <Select
              value={filters.category || ''}
              onValueChange={(value) => onFiltersChange({ ...filters, category: value || undefined })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Price Range */}
          <div>
            <Label className="text-sm font-medium">Price Range</Label>
            <div className="flex gap-2 mt-2">
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice || ''}
                  onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                />
              </div>
              <span className="self-center">-</span>
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Condition */}
          <div>
            <Label className="text-sm font-medium">Condition</Label>
            <div className="space-y-2 mt-2">
              {conditions.map(condition => (
                <div key={condition.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={condition.value}
                    checked={filters.condition?.includes(condition.value) || false}
                    onCheckedChange={(checked) => 
                      handleConditionChange(condition.value, checked as boolean)
                    }
                  />
                  <Label htmlFor={condition.value} className="text-sm">
                    {condition.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <Button variant="outline" onClick={clearFilters} className="w-full">
            Clear All Filters
          </Button>
        </CardContent>
      )}
    </Card>
  );
};