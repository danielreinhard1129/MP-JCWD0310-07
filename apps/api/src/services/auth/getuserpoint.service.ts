import prisma from '@/prisma';

export const getUserPointService = async () => {
  try {
    const reff = "LOLI"
    const userPoint = await prisma.user.findFirst({
      where: {
        referralCode: reff,
      },
      include: {
        points: true,
      },
    });

    if (!userPoint) {
      console.log(`No user found with refferal code ${reff}`);
      return { message: 'User not found', data: null };
    }

    console.log(`User found with referral code ${reff}:`, userPoint);

    if (userPoint.points.length === 0) {
      console.log(`No points found for user with ID ${userPoint.id}`);
    } else {
      console.log(
        `Points found for user with ID ${userPoint.id}:`,
        userPoint.points,
      );
    }

    return {
      message: 'get user point success',
      data: userPoint,
    };
  } catch (error) {
    throw error;
  }
};