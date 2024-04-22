'use server'
import { prismaInstance } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

//Load the initial data into the database required for the application to work
export const loadInitialData = async (dataToLoad: 'init' | 'company' | 'locations' | 'resources' | 'users' | 'bookings') => {
  if (dataToLoad === 'init') {
    await loadCompanyData()
    await loadLocationData()
    await loadResourceData()
    await loadUserData()
  }
  if (dataToLoad === 'company') {
    await loadCompanyData()
  }
  if (dataToLoad === 'locations') {
    await loadLocationData()
  }
  if (dataToLoad === 'resources') {
    await loadResourceData()
  }
  if (dataToLoad === 'users') {
    await loadUserData()
  }
}

// Function to load the initial company data
const loadCompanyData = async () => {
  console.log('\nCreating Company')
  try {
    await prismaInstance.company.create({
      data: {
        name: 'Broadridge',
        code: '1001',
        logo: 'https://www.broadridge.com/_assets/images/logos/br-pimary-blue-logo.svg',
      }
    })
  } catch (error) {
    console.log('error ->', error)
    return
  }

  console.log('Company Created\n')
}

// Function to load the initial location data
const loadLocationData = async () => {
  console.log('\nCreating Broadridge Locations')
  const company = await prismaInstance.company.findFirst({ where: { code: '1001' } })
  if (!company) { console.log('Broadridge Company not found'); return }

  try {
    await prismaInstance.location.createMany({
      data: [
        { name: 'Banglore', companyID: company.id, region: 'APAC' },
        { name: 'Hyderabad', companyID: company.id, region: 'APAC' },
        { name: 'Hong-Kong', companyID: company.id, region: 'APAC' },
        { name: 'Singapore', companyID: company.id, region: 'APAC' },
        { name: 'Tokyo', companyID: company.id, region: 'APAC' },
        { name: 'Manila', companyID: company.id, region: 'APAC' },
        { name: 'Paris', companyID: company.id, region: 'EMEA' },
        { name: 'Frankfurt', companyID: company.id, region: 'EMEA' },
        { name: 'Prague', companyID: company.id, region: 'EMEA' },
        { name: 'Cluj', companyID: company.id, region: 'EMEA' },
        { name: 'Berlin', companyID: company.id, region: 'EMEA' },
        { name: 'Gdansk', companyID: company.id, region: 'EMEA' },
        { name: 'Stockholm', companyID: company.id, region: 'EMEA' },
        { name: 'Arthur-Street', companyID: company.id, region: 'UK' },
        { name: 'Marsh-Wall', companyID: company.id, region: 'UK' },
        { name: 'Edingburgh', companyID: company.id, region: 'UK' },
        { name: 'Dundrum', companyID: company.id, region: 'UK' },
        { name: 'Vancouver', companyID: company.id, region: 'NA' },
        { name: 'El-Dorado', companyID: company.id, region: 'NA' },
        { name: 'Devner', companyID: company.id, region: 'NA' },
        { name: 'Kansas-City', companyID: company.id, region: 'NA' },
        { name: 'Coppell', companyID: company.id, region: 'NA' },
        { name: 'Toronto', companyID: company.id, region: 'NA' },
        { name: 'Pitsburgh', companyID: company.id, region: 'NA' },
        { name: 'Markham', companyID: company.id, region: 'NA' },
        { name: 'Ottowa', companyID: company.id, region: 'NA' },
        { name: 'Phoenix', companyID: company.id, region: 'NA' },
        { name: 'Mt-Laurel', companyID: company.id, region: 'NENA' },
        { name: 'South-Windsor', companyID: company.id, region: 'NENA' },
        { name: 'Boston', companyID: company.id, region: 'NENA' },
        { name: 'Andover', companyID: company.id, region: 'NENA' },
        { name: 'Lake-Success', companyID: company.id, region: 'NENA' },
        { name: 'Edgewood-1', companyID: company.id, region: 'NENA' },
        { name: 'Edgewood-2', companyID: company.id, region: 'NENA' },
        { name: 'Thrid-Avenue', companyID: company.id, region: 'NENA' },
        { name: 'Gateway-Center', companyID: company.id, region: 'NENA' }
      ]
    })
  } catch (error) {
    console.log('error ->', error)
    return
  }


  console.log('Broadridge Locations Created\n')
}

// Function to load the initial resource data
const loadResourceData = async () => {
  console.log('\nCreating Resources')
  const locations = await prismaInstance.location.findMany()

  for (const location of locations) {
    try {
      console.log('Creating resources for location: ', location.name)

      const resources = await prismaInstance.resource.createMany({
        data: [
          { name: '0.015', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.016', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.017', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.018', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.019', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.020', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.021', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.022', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.023', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.024', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.025', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.026', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.027', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.028', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.029', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.030', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.031', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.032', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.033', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.034', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.035', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.037', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.038', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.039', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.040', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.041', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.042', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.043', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.044', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.045', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.046', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.047', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.048', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.049', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.050', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.051', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.052', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.053', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.054', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.055', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.056', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.057', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.058', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.059', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.060', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.061', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.062', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.063', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.064', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.065', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.066', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.067', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.068', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.069', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.070', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.071', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.072', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.073', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.074', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.075', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.076', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.077', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.078', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.079', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.080', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.081', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.082', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.083', type: 'desk', restrictedRoles: ['IT'], locationID: location.id, floor: 0 },
          { name: '0.084', type: 'desk', restrictedRoles: ['IT'], locationID: location.id, floor: 0 },
          { name: '0.085', type: 'desk', restrictedRoles: ['IT'], locationID: location.id, floor: 0 },
          { name: '0.086', type: 'desk', restrictedRoles: ['IT'], locationID: location.id, floor: 0 },
          { name: '0.087', type: 'desk', restrictedRoles: ['IT'], locationID: location.id, floor: 0 },
          { name: '0.088', type: 'desk', restrictedRoles: ['IT'], locationID: location.id, floor: 0 },
          { name: '0.089', type: 'desk', restrictedRoles: ['IT'], locationID: location.id, floor: 0 },
          { name: '0.090', type: 'desk', restrictedRoles: ['IT'], locationID: location.id, floor: 0 },
          { name: '0.091', type: 'desk', restrictedRoles: ['IT'], locationID: location.id, floor: 0 },
          { name: '0.092', type: 'desk', restrictedRoles: ['IT'], locationID: location.id, floor: 0 },
          { name: '0.093', type: 'desk', restrictedRoles: ['IT'], locationID: location.id, floor: 0 },
          { name: '0.094', type: 'desk', restrictedRoles: ['IT'], locationID: location.id, floor: 0 },
          { name: '0.095', type: 'desk', restrictedRoles: ['IT'], locationID: location.id, floor: 0 },
          { name: '0.096', type: 'desk', restrictedRoles: ['IT'], locationID: location.id, floor: 0 },
          { name: '0.097', type: 'desk', restrictedRoles: ['IT'], locationID: location.id, floor: 0 },
          { name: '0.098', type: 'desk', restrictedRoles: ['IT'], locationID: location.id, floor: 0 },
          { name: '0.101', type: 'meeting_room', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.102', type: 'meeting_room', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.103', type: 'meeting_room', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.104', type: 'meeting_room', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.105', type: 'meeting_room', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.106', type: 'meeting_room', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.108', type: 'meeting_room', restrictedRoles: ['IT'], locationID: location.id, floor: 0 },
          { name: '0.109', type: 'office', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.110', type: 'office', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.116', type: 'office', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.117', type: 'office', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.118', type: 'office', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '0.119', type: 'office', restrictedRoles: [], locationID: location.id, floor: 0 },
          { name: '3.001', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.002', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.003', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.004', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.005', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.006', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.007', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.008', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.009', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.010', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.011', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.012', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.013', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.014', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.015', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.016', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.017', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.018', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.019', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.020', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.021', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.022', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.023', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.024', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.025', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.026', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.027', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.028', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.029', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.030', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.031', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.032', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.033', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.034', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.035', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.036', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.037', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.038', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.039', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.040', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.041', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.042', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.043', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.044', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.045', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.046', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.047', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.048', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.049', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.050', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.051', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.052', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.053', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.054', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.055', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.056', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.057', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.058', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.059', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.060', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.061', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.062', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.063', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.064', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.065', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.066', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.067', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.068', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.069', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.070', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.071', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.072', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.073', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.074', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.075', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.076', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.077', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.078', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.079', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.080', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.081', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.082', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.083', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.084', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.085', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.086', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.087', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.088', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.089', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.090', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.091', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.092', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.093', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.101', type: 'meeting_room', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.102', type: 'meeting_room', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.103', type: 'office', restrictedRoles: ['HR'], locationID: location.id, floor: 3 },
          { name: '3.104', type: 'office', restrictedRoles: ['HR'], locationID: location.id, floor: 3 },
          { name: '3.201', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.202', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.203', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.204', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.205', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.206', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.207', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.208', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.209', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.210', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.211', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.212', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.213', type: 'desk', restrictedRoles: ['HR'], locationID: location.id, floor: 3 },
          { name: '3.214', type: 'desk', restrictedRoles: ['HR'], locationID: location.id, floor: 3 },
          { name: '3.215', type: 'desk', restrictedRoles: ['HR'], locationID: location.id, floor: 3 },
          { name: '3.216', type: 'desk', restrictedRoles: ['HR'], locationID: location.id, floor: 3 },
          { name: '3.217', type: 'desk', restrictedRoles: ['HR'], locationID: location.id, floor: 3 },
          { name: '3.218', type: 'desk', restrictedRoles: ['HR'], locationID: location.id, floor: 3 },
          { name: '3.219', type: 'desk', restrictedRoles: ['HR'], locationID: location.id, floor: 3 },
          { name: '3.220', type: 'desk', restrictedRoles: ['HR'], locationID: location.id, floor: 3 },
          { name: '3.221', type: 'desk', restrictedRoles: ['HR'], locationID: location.id, floor: 3 },
          { name: '3.222', type: 'desk', restrictedRoles: ['HR'], locationID: location.id, floor: 3 },
          { name: '3.223', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: '3.224', type: 'desk', restrictedRoles: [], locationID: location.id, floor: 3 },
          { name: 'bay-4', type: 'parking', restrictedRoles: [], locationID: location.id, floor: -1 },
          { name: 'bay-47', type: 'parking', restrictedRoles: [], locationID: location.id, floor: -1 },
          { name: 'bay-48', type: 'parking', restrictedRoles: [], locationID: location.id, floor: -1 },
          { name: 'bay-49', type: 'parking', restrictedRoles: [], locationID: location.id, floor: -1 },
          { name: 'bay-5', type: 'parking', restrictedRoles: [], locationID: location.id, floor: -1 },
          { name: 'bay-50', type: 'parking', restrictedRoles: [], locationID: location.id, floor: -1 },
          { name: 'bay-51', type: 'parking', restrictedRoles: [], locationID: location.id, floor: -1 },
          { name: 'bay-52', type: 'parking', restrictedRoles: [], locationID: location.id, floor: -1 },
          { name: 'bay-64', type: 'parking', restrictedRoles: [], locationID: location.id, floor: -1 },
          { name: 'bay-65', type: 'parking', restrictedRoles: [], locationID: location.id, floor: -1 },
          { name: 'bay-66', type: 'parking', restrictedRoles: [], locationID: location.id, floor: -1 },
          { name: 'bay-67', type: 'parking', restrictedRoles: [], locationID: location.id, floor: -1 },
          { name: 'bay-68', type: 'parking', restrictedRoles: [], locationID: location.id, floor: -1 },
          { name: 'bay-69', type: 'parking', restrictedRoles: [], locationID: location.id, floor: -1 }
        ]
      })

      console.log("Data loaded successfully for location: ", location.name)
    } catch (error) {
      console.log('error ->', error)
      return
    }
  }

  console.log('Resources Load Complete\n')
}

// Function to load the initial user data
const loadUserData = async () => {
  console.log('\nCreating Users -> This will not cover Oauth Users')
  const company = await prismaInstance.company.findFirst({ where: { name: 'Broadridge' } })
  if (!company) { console.log('Company not found  - skipping user creation'); return }
  try {
    const password = await bcrypt.hash('Password@1', 10)
    await prismaInstance.user.createMany({
      data: [
        { name: 'Ayrton Senna', email: 'Dev.Coppertop+Broadhub.AyrtonSenna@gmail.com', role: 'ADMIN', password: password, emailVerified: new Date(), image: 'https://images.immediate.co.uk/production/volatile/sites/3/2023/02/Ayrton-Senna-faed582.jpg?quality=90&webp=true&fit=975,649', companyID: company.id },
        { name: 'Mika Hakkinen', email: 'Dev.Coppertop+Broadhub.MikaHakkinen@gmail.com', role: 'HR', password: password, emailVerified: new Date(), image: 'https://f1.fandom.com/wiki/Mika_H%C3%A4kkinen', companyID: company.id },
        { name: 'Sebastian Vettel', email: 'Dev.Coppertop+Broadhub.SebastianVettel@gmaiI.com', role: 'IT', password: password, emailVerified: new Date(), image: 'https://en.wikipedia.org/wiki/List_of_Formula_One_Grand_Prix_wins_by_Sebastian_Vettel', companyID: company.id },
        { name: 'Michael Schumacher', email: 'Dev.Coppertop*Broadhub.MichaelSchumacher@gmaiI.com', role: 'MANAGER', password: password, emailVerified: new Date(), image: 'https://i2-prod.mirror.co.uk/incoming/article23101907.ece/ALTERNATES/s1200c/0_FILE-PHOTO-Michael-Schumacher-Ferrari-celebrates-winnning-the-race.jpg', companyID: company.id },
        { name: 'Lewis Hamilton', email: 'Dev.Coppertop+Broadhub.LewisHamilton@gmail.com', role: 'USER', password: password, emailVerified: new Date(), image: 'https://images.immediate.co.uk/production/volatile/sites/3/2023/02/Lewis-Hamilton-4698110.jpg?quality=90&webp=true&fit=975,649', companyID: company.id },
      ]
    })
  } catch (error) {
    console.log('error ->', error)
    return
  }

  console.log('Created Users as per readme\n')
}


