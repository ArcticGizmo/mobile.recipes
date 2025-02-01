import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import HomePage from '@/views/HomePage.vue'

describe('Tab1Page.vue', () => {
  test('renders tab 1 Tab1Page', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.text()).toMatch('Tab 1 page')
  })
})
