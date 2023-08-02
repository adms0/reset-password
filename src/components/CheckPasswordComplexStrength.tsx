
import React, {Fragment} from 'react'
import {generateColors, getIcon, testingPasswordComplexStrength} from "../helpers/testingReactPassword";
import {TypePasswordProps} from "../static";
import {Box, Typography} from '@mui/material'

const CheckPasswordStreangth: React.FC<TypePasswordProps> = ({password, ...props}) => {
  const passwordStrengthTesting = testingPasswordComplexStrength(password)
  const Icon = getIcon(passwordStrengthTesting)
  const colors = generateColors(passwordStrengthTesting)

  return (
    <Fragment>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'5px'} margin="10px 0">
        {
          colors?.map((color, index) => {
            return (
              <Box key={index} flex={1} height="5px" borderRadius={'5px'} bgcolor={color}></Box>
            )
          })
        }
      </Box>
      <Box display={'flex'} alignItems={'center'} justifyContent={'flex-start'} gap="5px" margin="0 0 15px 0">
        <Icon htmlColor={colors[0]} />
        <Typography color={colors[0]}>{passwordStrengthTesting}</Typography>
      </Box>
    </Fragment>
  )

}

export default CheckPasswordStreangth