

export async function insertUser(formData: FormData) {
  const name = formData.get('name') as string
  const isDrugDealer = formData.get('isDrugDealer') === 'true'

  if (!name) {
    return { success: false, message: 'Name is required.' }
  }

  try {
    await db.insert(users).values({ name, isDrugDealer })
    return { success: true, message: 'User inserted successfully!' }
  } catch (error) {
    console.error('Error inserting user:', error)
    return { 
      success: false, 
      message: 'Error inserting user.', 
      error: error instanceof Error ? error.message : String(error)
    }
  }
}