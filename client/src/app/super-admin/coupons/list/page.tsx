"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCouponStore } from "@/store/useCouponStore";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SuperAdminCouponsListingPage = () => {
  const router = useRouter();
  const { coupons, fetchAllCoupons } = useCouponStore();

  useEffect(() => {
    const fetchCoupons = async () => {
      await fetchAllCoupons();
    };

    fetchCoupons();
  }, []);

  console.log(coupons);

  const handleDeleteCoupon = (couponId: string) => {};
  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <h1>All coupons</h1>
          <Button onClick={() => router.push("/super-admin/coupons/add")}>
            Add New coupon
          </Button>
        </header>
        <div className="rounded-lg border bg-card">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Coupon Code</TableHead>
                  <TableHead>Discount Percentage</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Usage Limit </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium">{coupon.code}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{coupon.discountPercent}%</TableCell>
                    <TableCell>
                      <p>{coupon.startDate}</p>
                    </TableCell>
                    <TableCell>
                      <p>{coupon.endDate}</p>
                    </TableCell>
                    <TableCell>
                      <p>{coupon.usageLimit}</p>
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() => handleDeleteCoupon(coupon.id)}
                          variant={"ghost"}
                          size={"icon"}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminCouponsListingPage;
