/*
  Warnings:

  - You are about to drop the column `idGastos` on the `categoriaGasto` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "categoriaGasto" DROP CONSTRAINT "categoriaGasto_idGastos_fkey";

-- AlterTable
ALTER TABLE "categoriaGasto" DROP COLUMN "idGastos";

-- AlterTable
ALTER TABLE "gastos" ADD COLUMN     "idCategoria" INTEGER;

-- AddForeignKey
ALTER TABLE "gastos" ADD CONSTRAINT "gastos_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "categoriaGasto"("idCategoria") ON DELETE SET NULL ON UPDATE CASCADE;
